package utils;

public class BinaryTreeElement<T extends Comparable<T>>{

	public BinaryTreeElement<T> parent;
	public BinaryTreeElement<T> left;
	public BinaryTreeElement<T> right;
	public Comparable<T> t;
	
	public BinaryTreeElement(Comparable<T> t) {
		this.wrap(t);
	}
	
	public BinaryTreeElement<T> wrap(Comparable<T> t) {
		this.t = t;
		return this;
	}
	
	public Comparable<T> unwrap(BinaryTreeElement<T> t) {
		return this.t;
	}

	public int compareTo(BinaryTreeElement<T> o) {
		return this.t.compareTo((T) o.t);
	}
}
