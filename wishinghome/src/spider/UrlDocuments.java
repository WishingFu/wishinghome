package spider;

import java.io.IOException;
import java.io.InputStream;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class UrlDocuments {

	public static Document getDocument(InputStream in,String baseUri) {
		try {
			Document doc = Jsoup.parse(in, null, baseUri);
			return doc;
		} catch (IOException e) {
			ErrLog.log(e.getLocalizedMessage());
		}
		return null;
	}
}
