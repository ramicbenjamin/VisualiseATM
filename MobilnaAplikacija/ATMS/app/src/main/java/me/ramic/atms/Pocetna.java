package me.ramic.atms;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class Pocetna extends AppCompatActivity implements CallAPI.onCallApiDone{

    SharedPreferences sharedpreferences;
    public static final String MyPREFERENCES = "MyPrefs" ;
    public static final String aktivniBankomat = "bankomatKey";
    public static final String aktivnaKartica = "karticaKey";
    public static final String aktivniRacun = "racunKey";
    public ArrayList<String> listaIdevaBankomata = new ArrayList<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pocetna);
        new CallAPI((CallAPI.onCallApiDone)Pocetna.this).execute("http://10.0.2.2:3000/api/dajSveNaziveBankomata");


        Button bankomatLogInB = (Button)findViewById(R.id.bankomatLogInButton);
        bankomatLogInB.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                LogInUBankomat();
            }
        });
    }

    void LogInUBankomat()
    {
        Spinner dropdown = (Spinner)findViewById(R.id.listaBankomata);
        //System.out.println(dropdown.getSelectedItem().toString());

        sharedpreferences = getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedpreferences.edit();
        editor.putString(aktivniBankomat, listaIdevaBankomata.get(dropdown.getSelectedItemPosition()));
        editor.commit();

        Intent UCLAc = new Intent(Pocetna.this, UserCardLogIn.class);
        Pocetna.this.startActivity(UCLAc);
    }

    @Override
    public void onBackPressed()
    {

    }

    @Override
    public void onDone(String rez) {
        try
        {
            Spinner dropdown = (Spinner)findViewById(R.id.listaBankomata);
            ArrayList<String> nizBankomata = new ArrayList<>();
            JSONArray nizNazivaBankomata = new JSONArray(rez);
            for(int i = 0; i < nizNazivaBankomata.length(); i++)
            {
                JSONObject pojedinacniBankomat = (JSONObject) nizNazivaBankomata.get(i);
                nizBankomata.add(pojedinacniBankomat.getString("identifikator"));
                listaIdevaBankomata.add(pojedinacniBankomat.getString("idBankomat"));

            }
            ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_dropdown_item, nizBankomata);
            dropdown.setAdapter(adapter);
        }catch (JSONException e) {
            e.printStackTrace();
        }

    }
}
