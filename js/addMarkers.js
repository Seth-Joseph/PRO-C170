AFRAME.registerComponent("create-markers", {
  
    init: async function() {
  
      var mainScene = document.querySelector("#main-scene");
  
      //get the dishes collection from firestore database
      var toys = await this.getToys();
     
      toys.map(toy => {
        var marker = document.createElement("a-marker");   
        marker.setAttribute("id", toy.id);
        marker.setAttribute("type", "pattern");
        marker.setAttribute("url", toy.marker_pattern_url);
        marker.setAttribute("cursor", {
          rayOrigin: "mouse"
        });
  
        //set the markerhandler component
        marker.setAttribute("markerhandler", {});
        mainScene.appendChild(marker);
  
        // Adding 3D model to scene
        var model = document.createElement("a-entity");    
       
        model.setAttribute("id", `model-${toy.id}`);
        model.setAttribute("position", toy.model_geometry.position);
        model.setAttribute("rotation", toy.model_geometry.rotation);
        model.setAttribute("scale", toy.model_geometry.scale);
        model.setAttribute("gltf-model", `url(${toy.model_url})`);
        model.setAttribute("gesture-handler", {});
        marker.appendChild(model);
  
        // description Container
        var mainPlane = document.createElement("a-plane");
        mainPlane.setAttribute("id", `main-plane-${toy.id}`);
        mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
        mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        mainPlane.setAttribute("width", 1.5);
        mainPlane.setAttribute("height", 1.5);
        mainPlane.setAttribute('material',{color:"#f7c094"});
        marker.appendChild(mainPlane);
  
        // toy title background plane
        var titlePlane = document.createElement("a-plane");
        titlePlane.setAttribute("id", `title-plane-${toy.id}`);
        titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
        titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        titlePlane.setAttribute("width", 1.49);
        titlePlane.setAttribute("height", 0.3);
        titlePlane.setAttribute("material", { color: "#FD3C02" });
        
        mainPlane.appendChild(titlePlane);
  
        //price plane
        
  
        var priceText = document.createElement("a-entity");
        priceText.setAttribute("id", `price-text-${toy.id}`);
        priceText.setAttribute("position", { x: 0, y: -0.5, z: 0.1 });
        priceText.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        priceText.setAttribute("text", {
          font: "monoid",
          color: "green",
          width: 1.8,
          height: 1,
          align: "center",
          value: `Price:${toy.price}/-`
        });
        mainPlane.appendChild(priceText);
      
        // toy title
        var toyTitle = document.createElement("a-entity");
        toyTitle.setAttribute("id", `dish-title-${toy.id}`);
        toyTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 });
        toyTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        toyTitle.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 1.8,
          height: 1,
          align: "center",
          value: toy.toy_name.toUpperCase()
        });
        titlePlane.appendChild(toyTitle);
  
        // description List
        var description = document.createElement("a-entity");
        description.setAttribute("id", `description-${toy.id}`);
        description.setAttribute("position", { x: 0.5, y: 0.2, z: 0.1 });
        description.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        description.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 2,
          align: "left",
          value: `${toy.description.join("\n\n")}`
        });
        mainPlane.appendChild(description);
      });
    },
    //function to get the dishes collection from firestore database
    getToys: async function() {
      return await firebase
        .firestore()
        .collection("toys")
        .get()
        .then(snap => {
          return snap.docs.map(doc => doc.data());
        });
    }
  });
  