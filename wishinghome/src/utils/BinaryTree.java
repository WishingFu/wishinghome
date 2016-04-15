package utils;

import java.util.ArrayList;
import java.util.List;

public class BinaryTree<T extends Comparable<T>> {
	
	class BinaryTreeElement<T extends Comparable<T>>{

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

	
	
	private BinaryTreeElement<T> root;
	private List<BinaryTreeElement<T>> elements = new ArrayList<>();
	
	private BinaryTreeElement<T> getWrappedElement(Comparable<T> t) {
		return new BinaryTreeElement<T>(t);
	}
	
	public void insert(Comparable<T> t) {
		BinaryTreeElement<T> insert = this.getWrappedElement(t);
		if(this.root == null) {
			root = insert;
			elements.add(insert);
		} else {
			boolean inserted = false;
			BinaryTreeElement<T> now = root;
			while(!inserted) {
				if(insert.compareTo(now) <= 0) {
					if(now.left != null) {
						now = now.left;
					} else {
						insert.parent = now;
						now.left = insert;
						elements.add(insert);
						inserted = true;
					}
				} else {
					if(now.right != null) {
						now = now.right;
					} else {
						insert.parent = now;
						now.right = insert;
						elements.add(insert);
						inserted = true;
					}
				}
			}
		}
	}
	
	public void remove(T t) {
		
	}
	
	public T maximum() {
		
		return null;
	}
	
	public T minimum() {
		
		return null;
	}
	
	public T successor(T t) {
		
		return t;
	}
	
	public T predecessor(T t) {
		
		return t;
	}

	@Override
	public String toString() {
		String to = "";
		for(int i = 0; i < elements.size(); i++) {
			String parent = "NIL";
			String left = "NIL";
			String right = "NIL";
			if(elements.get(i).left != null) {
				left = elements.get(i).left.t.toString();
			}
			if(elements.get(i).parent != null) {
				parent = elements.get(i).parent.t.toString();
			}
			if(elements.get(i).right != null) {
				right = elements.get(i).right.t.toString();
			}
			to +=  " " + elements.get(i).t + " : [parent:" + parent + " left:" + left + " right:" + right + " ] ";
		}
		return to;
	}
}
