package spider;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;

public class URLConnectionTest {

	private static final String URL = "http://www.baidu.com"; 
	
	public static void getURLConnection() throws IOException {
		URL url = new URL(URL);
		
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		
		Map<String, List<String>> header = conn.getHeaderFields();
		
		System.out.println("-------------------------");
		for(String header_name : header.keySet()) {
			List<String> header_props = header.get(header_name);
			System.out.println(header_name);
			for(String header_prop : header_props) {
				System.out.println("\t"+header_prop);
			}
			System.out.println("-------------------------");
		}
		conn.disconnect();
	}
	
	public static void main(String[] args) {
		try {
			URLConnectionTest.getURLConnection();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
