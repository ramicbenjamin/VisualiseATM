package me.ramic.atms;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.telecom.Call;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class UzimanjePara extends AppCompatActivity implements CallAPI.onCallApiDone, CallAPI.digniNovac, CallAPI.stanjeBankomata{

    SharedPreferences sharedpreferences;
    public static final String MyPREFERENCES = "MyPrefs" ;
    public static final String aktivniBankomat = "bankomatKey";
    public static final String aktivnaKartica = "karticaKey";
    public static final String aktivniRacun = "racunKey";
    private double trenutnoRaspolozivaKolicinaNovcaRAC;
    private double trenutnoRaspolozivaKolicinaNovcaBAN;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_uzimanje_para);
        Button potvrdaKolicineNovcaBtn = (Button)findViewById(R.id.potvrdaPara);
        Button odjavaBtn = (Button)findViewById(R.id.odjavaButton);
        final EditText kolicinaNovcaTV = (EditText)findViewById(R.id.kolicinaNovca);
        sharedpreferences = getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);

        new CallAPI((CallAPI.onCallApiDone)UzimanjePara.this).execute("http://10.0.2.2:3000/api/dajStanjeRacuna/" + sharedpreferences.getString(aktivnaKartica, ""));
        new CallAPI((CallAPI.stanjeBankomata)UzimanjePara.this).execute("http://10.0.2.2:3000/api/dajBankomat/" + sharedpreferences.getString(aktivniBankomat, ""));
        potvrdaKolicineNovcaBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(skidanjePara(Double.parseDouble(kolicinaNovcaTV.getText().toString())))
                {
                    Toast.makeText(getApplicationContext(), "Uspješno", Toast.LENGTH_SHORT).show();
                }else{
                    Toast.makeText(getApplicationContext(), "Neuspješno", Toast.LENGTH_SHORT).show();
                }
            }
        });

        odjavaBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent POCAc = new Intent(UzimanjePara.this, Pocetna.class);
                UzimanjePara.this.startActivity(POCAc);
            }
        });
    }

    Boolean skidanjePara(Double kolicinaNovca) {
        if (trenutnoRaspolozivaKolicinaNovcaRAC < kolicinaNovca ){
            Toast.makeText(getApplicationContext(), "Nemate dovoljno novca na računu.", Toast.LENGTH_SHORT).show();
            return false;
        }else if(trenutnoRaspolozivaKolicinaNovcaBAN < kolicinaNovca){
            Toast.makeText(getApplicationContext(), "Bankomat trenutno nema toliko raspoloživog novca.", Toast.LENGTH_SHORT).show();
            return false;
        }else {
            new CallAPI((CallAPI.digniNovac)UzimanjePara.this).execute("http://10.0.2.2:3000/api/digniNovacSaBankomata/"+sharedpreferences.getString(aktivniBankomat, "")+"/"+kolicinaNovca);
            new CallAPI((CallAPI.digniNovac)UzimanjePara.this).execute("http://10.0.2.2:3000/api/upisiNovuTransakciju/"+sharedpreferences.getString(aktivnaKartica, "")+"/"+sharedpreferences.getString(aktivniBankomat, "")+"/"+kolicinaNovca);
            new CallAPI((CallAPI.digniNovac)UzimanjePara.this).execute("http://10.0.2.2:3000/api/skiniNovacSaRacuna/"+sharedpreferences.getString(aktivnaKartica, "")+"/"+kolicinaNovca);
            return true;
        }
    }

    @Override
    public void onBackPressed()
    {

    }

    @Override
    public void onDone(String rez) {
       TextView noviTextView = (TextView) findViewById(R.id.trenutnoStanjeRacuna);
        try {
            JSONArray rezultat = new JSONArray(rez);
            JSONObject nazivLabele = (JSONObject) rezultat.get(0);
            noviTextView.setText(noviTextView.getText() + nazivLabele.getString("kolicinaNovca"));
            trenutnoRaspolozivaKolicinaNovcaRAC = nazivLabele.getDouble("kolicinaNovca");

        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    @Override
    public void zavrsenoDizanje(String rez) {
        System.out.println(rez);
    }

    @Override
    public void zavrsenoDobavljanjeStanjaBankomata(String rez) {
        try {
            JSONArray rezultat = new JSONArray(rez);
            JSONObject nazivLabele = (JSONObject) rezultat.get(0);
            trenutnoRaspolozivaKolicinaNovcaBAN = nazivLabele.getDouble("kolicinaNovca");

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
