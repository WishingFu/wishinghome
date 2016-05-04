package study.mongo;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.gt;
import static com.mongodb.client.model.Filters.gte;
import static com.mongodb.client.model.Filters.or;

import java.util.Arrays;
import java.util.Date;

import org.bson.BsonReader;
import org.bson.BsonWriter;
import org.bson.Document;
import org.bson.codecs.Codec;
import org.bson.codecs.DecoderContext;
import org.bson.codecs.EncoderContext;
import org.bson.json.JsonWriterSettings;

import com.mongodb.MongoClient;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.UpdateResult;

public class ConnectMongo implements Codec<ConnectMongo>{
	
	public String curl = "";
	public JsonWriterSettings j = new JsonWriterSettings(true);
	
	
	public void getConnect() {
//		MongoClient mc = new MongoClient("192.168.2.156", 27017);
//		MongoDatabase md = mc.getDatabase("jhs");
		MongoClient mc = new MongoClient("localhost", 27017);
		MongoDatabase md = mc.getDatabase("test");
		System.out.println(md);
		
//		md.createCollection("fromJ");
//		MongoCollection<Document> mcol = md.getCollection("fromJ");
		MongoCollection<Document> mcol = md.getCollection("first");
		System.out.println(mcol.count());
		
//		mcol.insertOne(new Document("value", new Document("nested","")).append("from", "java").append("insert", 1));
		FindIterable<Document> fi = mcol.find();
		fi.forEach((Document d) -> System.out.println(d.toJson(j)));
		System.out.println("-----------------------------------------------------");
//		FindIterable<Document> fi2 = mcol.find(new Document("value",new Document("nested","doc")));
//		fi2.forEach((Document d) -> System.out.println(d.toJson(new JsonWriterSettings(true))));
		FindIterable<Document> fi3 = mcol.find(gte("person.age", 20));
		fi3.forEach((Document d) -> System.out.println(d.toJson(j)));
		System.out.println("-----------------------------------------------------");
		/*
		 * 区分数字和字符串
		 */
		FindIterable<Document> fi4 = mcol.find(or(gt("age", 20), eq("person.age", 40)));
		fi4.forEach((Document d) -> System.out.println(d.toJson(j)));
		System.out.println("-----------------------------------------------------");
//		UpdateResult ur = mcol.updateOne(eq("age", 50), new Document("$set", new Document("age", 20).append("name", "updated")));
		/*
		 * new Date()会被转化为ISODate -8:00
		 */
		UpdateResult ur = mcol.updateOne(eq("age", 20), new Document("$set", new Document("Sex", "m")
				.append("lastUpdate", new Date())).append("$currentDate", new Document("lastModified", true)));
		System.out.println(ur.getModifiedCount());
		System.out.println("-----------------------------------------------------");
		AggregateIterable<Document> ai1 = mcol.aggregate(Arrays.asList(new Document("$group", new Document("_id", "$age")
				.append("count", new Document("$sum", 1)))));
		ai1.forEach((Document d) -> System.out.println(d.toJson(j)));
		mc.close();
		
	}
	
	
	public static void main(String[] args) {
		ConnectMongo cm = new ConnectMongo();
		cm.getConnect();
	}


	@Override
	public void encode(BsonWriter arg0, ConnectMongo arg1, EncoderContext arg2) {
		// TODO Auto-generated method stub
		
	}


	@Override
	public Class<ConnectMongo> getEncoderClass() {
		// TODO Auto-generated method stub
		return ConnectMongo.class;
	}


	@Override
	public ConnectMongo decode(BsonReader arg0, DecoderContext arg1) {
		// TODO Auto-generated method stub
		return new ConnectMongo();
	}
}
