package spider;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.RandomAccessFile;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Set;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class Searcher {

	private String start_url = CommonData.START_PAGE;
//	private List<String> urls = new ArrayList<String>();
	private HashMap<String, Integer> url_depth = new HashMap<String, Integer>();
	private HashMap<String, Integer> url_added = new HashMap<String, Integer>();
	private int depth_now = 1;
	private static final String LINESEPARATOR = System.lineSeparator();
	private RandomAccessFile urls_write = null;
	private URL url = null;
	private HttpURLConnection conn = null;
	private BufferedReader br = null;
	private BufferedWriter url_write = null;
	private BufferedWriter attrs_write = null;
	private int url_count = 1;
	
	/**
	 * 执行链接查找
	 * 
	 * @param url
	 * @throws IOException
	 */
	private void startUrlSearch(String url) throws IOException {
		this.url = new URL(url);
		System.out.println("[DEPTH:" + depth_now + "][URLS_COUNT:" + url_added.size() + "][URL_COUNT]" + url_count++);
		this.conn = (HttpURLConnection) this.url.openConnection();
//		this.br = new BufferedReader(new InputStreamReader(this.conn.getInputStream()));
//		String line = null;
//		String html = null;
//		while ((line = br.readLine()) != null) {
//			html += line;
//		}
//		if (html != null && !"".equals(html)) {
//			this.getUrls(html);
//			this.getContent(html);
//		}
		InputStream in = this.conn.getInputStream();
		Document doc = null;
		try {
//			doc = Jsoup.parse(in, null , this.url.toString());
			doc = Jsoup.parse(in, null , "");
			this.getUrls(doc);
			this.getContent(doc);
			attrs_write.flush();
			in.close();
			conn.disconnect();
		} catch (IOException e) {
			ErrLog.log(e.getMessage());
		}
	}

	/**
	 * 提取属性
	 * 
	 * @param html
	 */
	private void getContent(Document doc) {
//		Document doc = Jsoup.parse(html);
		
		Elements metas = doc.select("meta");
		String attrs = null;
		try {
			attrs_write.write("-------------Begin------------" + LINESEPARATOR + url.toString() + LINESEPARATOR);
			for (Element meta : metas) {
				if (!meta.attr("name").equals("")) {
					attrs = meta.attr("name") + ":" + meta.attr("content");
					attrs_write.write(attrs+LINESEPARATOR);
				}
			}
			attrs_write.write("--------------End-------------" + LINESEPARATOR);
		} catch (IOException e) {
			ErrLog.log(e.getMessage());
		}
	}

	/**
	 * 获得html中的urls
	 * 
	 * @param html
	 */
	private void getUrls(Document doc) {
//		Document doc = Jsoup.parse(html, this.url.toString());
		
		Elements links = doc.select("a");
		for (Element link : links) {
			String dis = link.attr("abs:href");
//			if (!urls.contains(dis) && dis.startsWith("http")) {
			if (dis.startsWith("http")) {
//				urls.add(dis);
				url_added.put(dis, depth_now + 1);
//				try {
//					url_write.write(dis.getBytes());
//				} catch (IOException e) {
//					ErrLog.log(e.getMessage());
//				}
			}
		}
	}

	/**
	 * 控制搜索深度
	 * 
	 * @throws IOException
	 */
	private void searchControlCenter() throws IOException {

		this.url_depth.put(start_url, 1);
		this.url_write = new BufferedWriter(new FileWriter(CommonData.URLS_LOCATION));
		this.attrs_write = new BufferedWriter(new FileWriter(CommonData.ATTRS_LOCATION));

		while (depth_now <= CommonData.SEARCH_DEPTH_MAX) {
			System.out.println(("[" + new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date())) + "]Start Depth Now :" + depth_now);
			searchControl(depth_now);
			//test
			this.url_depth.clear();
			this.url_depth.putAll(url_added);
			this.url_added.clear();
			System.out.println(("[" + new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date())) + "]End Depth Now :" + depth_now);
			this.depth_now++;
		}
		this.br.close();
		this.url_write.close();
		this.attrs_write.close();
	}

	/**
	 * 搜索当前深度的url
	 * 
	 * @param depth_search
	 */
	private void searchControl(int depth_search) {

		Set<String> urls_now = this.url_depth.keySet();
		for (String url_now : urls_now) {
//			int depth = url_depth.get(url_now);
//			if (depth == depth_search) {
				try {
					startUrlSearch(url_now);
				} catch (IOException e) {
					ErrLog.log(e.getMessage());
				}
//			}
		}
	}

	/**
	 * 启动搜索
	 * 
	 * @throws IOException
	 */
	public void search() throws IOException {
		this.searchControlCenter();
	}

	/**
	 * 测试
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		Searcher s = new Searcher();
		try {
			s.search();
			System.out.println();
		} catch (IOException e) {
			ErrLog.log(e.getMessage());
		}
	}
}
