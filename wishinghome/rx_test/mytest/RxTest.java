package mytest;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;

import rx.Observable;
import sun.misc.Unsafe;

public class RxTest {
	private static final Unsafe US = getUnsafe();
	
	public static void sentences(String... ss) {
		Observable.from(ss).map((s)->s.toUpperCase()).subscribe((s)->System.out.println("Hello " + s));
		List<String> li = Arrays.asList(ss);
		li.stream().map(s ->s.toUpperCase()).filter(s ->s.length()>1).forEach( s ->System.out.println("Hello " + s));
		System.out.println(US.shouldBeInitialized(RxTest.class));
	}
	
	public static Unsafe getUnsafe() {
	   try {
           Field f = Unsafe.class.getDeclaredField("theUnsafe");
           f.setAccessible(true);
           return (Unsafe)f.get(null);
	   } catch (Exception e) { 
		   e.printStackTrace();
	   }
	   return null;
	}
	
	public static void main(String[] args) {
		RxTest r = new RxTest();
		System.out.println(US.getLong(r, 8L));
		sentences("a", "ha", "world");
	}
	
}
