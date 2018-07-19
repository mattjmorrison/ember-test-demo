export default function() {
  this.urlPrefix = 'http://localhost:8000';
  this.get("/developers");
  this.delete("/developers/:id");
  this.patch("/developers/:id");
  this.post("/developers");

}
