package me.ramic.atms;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.provider.Settings;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class UserCardLogIn extends AppCompatActivity implements CallAPI.onCallApiDone{
    SharedPreferences sharedpreferences;
    public static final String MyPREFERENCES = "MyPrefs" ;
    public static final String aktivniBankomat = "bankomatKey";
    public static final String aktivnaKartica = "karticaKey";
    public static final String aktivniRacun = "racunKey";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_card_log_in);
        SharedPreferences sharedpreferences = getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);
        System.out.println("Ovo sam procitao iz prefs ali iz aktivnosti UCLAc " + sharedpreferences.getString(aktivniBankomat, " "));

        Button korisnikLogInBtn = (Button)findViewById(R.id.korisnikLogInButton);
        final EditText brojKarticeET = (EditText)findViewById(R.id.brojKartice);
        final EditText PINKarticeET = (EditText)findViewById(R.id.PINKartice);
        korisnikLogInBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                LogInKorisnik(brojKarticeET.getText().toString(), PINKarticeET.getText().toString());
            }
        });
    }

    Boolean LogInKorisnik(String brojKartice, String PINKartice)
    {

        String urlZaPoziv = new String ("http://10.0.2.2:3000/api/dajIdKartice/" + brojKartice + "/" + PINKartice);
        new CallAPI((CallAPI.onCallApiDone)UserCardLogIn.this).execute(urlZaPoziv);
        return true;
    }

    @Override
    public void onBackPressed()
    {

    }

    @Override
    public void onDone(String rez) {
        try {
            JSONArray idKarticaRezultati = new JSONArray(rez);
            JSONObject idKartice = idKarticaRezultati.getJSONObject(0);
            if(idKarticaRezultati.length() == 1)
            {
                sharedpreferences = getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);
                SharedPreferences.Editor editor = sharedpreferences.edit();
                editor.putString(aktivnaKartica, idKartice.getString("idKartica"));
                editor.commit();

                Intent UPAc = new Intent(UserCardLogIn.this, UzimanjePara.class);
                UserCardLogIn.this.startActivity(UPAc);
            }else
            {
                Toast.makeText(this, "Neispravni podaci", Toast.LENGTH_LONG).show();

            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }
}
