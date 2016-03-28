package spider;

import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ErrLog {

	private static BufferedWriter ERRLOG = null;

	static {
		try {
			ERRLOG = new BufferedWriter(new FileWriter(CommonData.ERRS_LOCATION));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static final void log(String log) {
		String errInfo = "[" + new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date()) + "]";
		errInfo += log;
		errInfo += System.lineSeparator();
		try {
			ERRLOG.write(errInfo);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
