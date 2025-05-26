package model.data;

public class Product {

    private String productName;
    private String id;
    private double price;
    private String region;
    private String department;
    private String productType;

    public Product() {}

    public Product(String productName, String id, double price, String region, String department, String productType) {
        this.productName = productName;
        this.id = id;
        this.price = price;
        this.region = region;
        this.department = department;
        this.productType = productType;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }
    
    public static Product createSampleProduct() {
        Product product = new Product();
        product.setProductName("Servidor Rackmount");
        product.setId("101"); // now a String
        product.setPrice(15000.99);
        product.setRegion("Brasil");
        product.setDepartment("Corporativo");
        product.setProductType("Servidor Rackmount");
        return product;
    }
}
