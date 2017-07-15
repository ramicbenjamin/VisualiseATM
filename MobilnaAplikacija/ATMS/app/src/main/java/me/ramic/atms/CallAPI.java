package me.ramic.atms;

import android.os.AsyncTask;
import android.telecom.Call;

import org.apache.commons.io.IOUtils;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by ramic on 13.05.2017..
 */

public class CallAPI extends AsyncTask <String, String, String> {

    public CallAPI(){

    }
    private onCallApiDone pozivatelj;
    public CallAPI(onCallApiDone p){pozivatelj = p;};
    private digniNovac pozivateljDizeNovac;
    public CallAPI(digniNovac p){pozivateljDizeNovac = p;};
    private stanjeBankomata pozivateljStanjaBankomata;
    public CallAPI(stanjeBankomata p){pozivateljStanjaBankomata = p;};
    @Override
    protected String doInBackground(String... params) {
        String urlString = params[0]; // URL to call

        String resultToDisplay = "";

        InputStream in = null;
        try {

            URL url = new URL(urlString);
            System.out.println(url.toString());
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

            in = new BufferedInputStream(urlConnection.getInputStream());


        } catch (Exception e) {

            System.out.println(e.getMessage());

            return e.getMessage();

        }

        try {
            resultToDisplay = IOUtils.toString(in, "UTF-8");
            System.out.println(resultToDisplay);
            //to [convert][1] byte stream to a string
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        return resultToDisplay;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        if (pozivatelj != null) {
            pozivatelj.onDone(s);
        }
        if (pozivateljDizeNovac != null){
            pozivateljDizeNovac.zavrsenoDizanje(s);
        }
        if (pozivateljStanjaBankomata != null){
            pozivateljStanjaBankomata.zavrsenoDobavljanjeStanjaBankomata(s);
        }

    }

    public interface onCallApiDone{
        public void onDone(String rez);
    }

    public interface digniNovac{
        public void zavrsenoDizanje(String rez);
    }

    public interface stanjeBankomata{
        public void zavrsenoDobavljanjeStanjaBankomata(String rez);
    }
}
