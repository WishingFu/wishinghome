package spider;

import java.io.IOException;
import java.io.InputStream;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

public class UrlConnections {

	private static CloseableHttpClient hc;
	
	static{
		hc = HttpClients.createDefault();
	}
	
	public static InputStream getConnection(String url) {
		
		try {
			url = url.split("-->")[1];
			HttpGet hg = new HttpGet(url);
			CloseableHttpResponse response  = hc.execute(hg);
			return response.getEntity().getContent();
		} catch (IOException e) {
			ErrLog.log(e.getLocalizedMessage());
		}
		return null;
	}

	public static void close() {
		try {
			hc.close();
		} catch (IOException e) {
			ErrLog.log(e.getLocalizedMessage());
		}
	}
}
