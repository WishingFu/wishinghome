package utils;

public class Test {
	
	public static void main(String[] args) {
		Integer[] xx = new Integer[]{ 31, 46, 53, 81, 13, 32, 61, 25, 35 };
		BinaryTree<Integer> bt = new BinaryTree<>();
		for(Integer x : xx) {
			bt.insert(x);
		}
		System.out.println(bt.toString());
	}
}
