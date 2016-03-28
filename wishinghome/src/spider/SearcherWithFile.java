package spider;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.RandomAccessFile;

import org.jsoup.nodes.Attribute;
import org.jsoup.nodes.Attributes;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class SearcherWithFile {

	private RandomAccessFile urls;
	private BufferedWriter attrs_write;
	
	private static final String LINESEPARATOR = System.lineSeparator();

	private static int url_count = 0;
	private static int url_amt = 0;
	private static int depth = 1;
	private static int skiped = 0;

	static class SaveData {

		public static void saveUrls(RandomAccessFile out, Document doc) {
			Elements links = doc.select("a");
			try {
				for (Element link : links) {
					String url = "";
					String final_url = (depth + 1) + "-->";
					url = link.attr("abs:href");
					if (url.startsWith("http:")) {
						url_amt++;
						final_url += url + LINESEPARATOR;
						out.seek(out.length());
						out.writeBytes(final_url);
					}
				}
			} catch (IOException e) {
				ErrLog.log(e.getLocalizedMessage());
			}
		}

		public static void saveAttrs(BufferedWriter out, Document doc) {
			Elements metas = doc.select("meta");
			doc.baseUri();
			try {
				out.write("-------------Begin------------" + LINESEPARATOR + doc.baseUri().toString());
				for (Element meta : metas) {
					Attributes attributes = meta.attributes();
					for (Attribute attribute : attributes) {
						String metaAttr = attribute.getKey() + "=:=" + attribute.getValue();
						out.write(metaAttr);
					}
					out.write(LINESEPARATOR);
				}
				out.write("--------------End-------------" + LINESEPARATOR);
				out.flush();
			} catch (IOException e) {
				ErrLog.log(e.getLocalizedMessage());
			} finally {
			}
		}
	}

	public void startSearch() {
		try {
			this.urls = new RandomAccessFile(CommonData.URLS_LOCATION, "rw");
			this.attrs_write = new BufferedWriter(new FileWriter(CommonData.ATTRS_LOCATION));
			this.urls.writeBytes("1-->" + CommonData.START_PAGE + LINESEPARATOR);
			while (depth <= CommonData.SEARCH_DEPTH_MAX) {
				url_count++;
				this.search();
				System.out.println("[DEPTH:" + depth + "][URLS_AMT:" + url_amt + "][URL_COUNT]" + url_count);
			}
		} catch (IOException e) {
			ErrLog.log(e.getLocalizedMessage());
		}
	}

	private void search() {

		try {
			this.urls.seek(skiped);
			String url_now = this.urls.readLine();
			skiped += (url_now + LINESEPARATOR).getBytes().length;
			Document doc = UrlDocuments.getDocument(UrlConnections.getConnection(url_now), "");
			SaveData.saveUrls(urls, doc);
			SaveData.saveAttrs(attrs_write, doc);
		} catch (IOException e) {
			ErrLog.log(e.getLocalizedMessage());
		}
	}
	
	public static void main(String[] args) {
		SearcherWithFile s = new SearcherWithFile();
		s.startSearch();
	}
}
