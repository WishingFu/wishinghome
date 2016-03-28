package spider;

public class CommonData {
	
	public static final String START_PAGE = "http://www.baidu.com/";
	public static final Integer SEARCH_DEPTH_MAX = 10;
	public static final String URL_PATTERN = "(?<=http\\://[a-zA-Z0-9]{0,100}[.]{0,1})[^.\\s]*?\\.(com|cn|net|org|biz|info|cc|tv)";
	public static final String JSON_PATTERN = "";
	public static final String URLS_LOCATION = "F://spider/urls.txt";
	public static final String ATTRS_LOCATION = "F://spider/attrs.txt";
	public static final String ERRS_LOCATION = "F://spider/errs.log";
}
