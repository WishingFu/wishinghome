package spider;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class Test {
	
	public static void main(String[] args) {
		try {
			Method[] me = String.class.getMethods();
			for(Method m : me) {
				if(m.toGenericString().equals("public java.lang.String java.lang.String.replace(String,String)")) {
					System.out.println((String)m.invoke(new String("sds"), "s" ,"w"));
				}
			}
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
	}
}
