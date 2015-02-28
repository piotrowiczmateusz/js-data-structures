function DoublyLinkedList() {
    		this.head = null;
            this.nodes = 0;
	}
	
DoublyLinkedList.prototype = {
    
    insertBeggining: function (key) {

        var node = {
                key: key,
                next: null,
                prev: null
            };
        
            node.next = this.head;
            
            if (this.head != null) {
                this.head.prev = node;
            }

            this.head = node;
            node.prev = null;
             
            this.nodes++;

    },

    insertEnd: function (key) {

        var node = {
                key: key,
                next: null,
                prev: null
            };
         
        if (this.head == null){
            this.head = node;
        } 

        else {
           
            var current = this.head;

            while (current.next != null){
                current = current.next;
            }

            current.next = node;
            node.prev = current;
        }
        this.nodes++;
    },

    insertBefore: function(key, current) {
    	
    	var node = {
                key: key,
                next: null,
                prev: null
            };
        
    	node.prev = current.prev;
		node.next = current;
		
        if (current.prev != null) {
			current.prev.next = node;
		}

		else {
			this.head = node;
		}
		
        current.prev = node;
		this.nodes++;
    },

    insertAfter: function(key, current) {		
		var node = {
                key: key,
                next: null,
                prev: null
            };

		node.prev = current;
		node.next = current.next;
		
		if (current.next != null) {
			current.next.prev = node;
		} 
		
		current.next = node;
		this.nodes++;
    },

    remove: function(node) {

    	if(node.prev != null ) {
    		node.prev.next = node.next;
    	}
    	
    	else {
    		this.head = node.next;
    	}
    	
    	if (node.next != null) {
    		node.next.prev = node.prev;
    	}
    	this.nodes--;
    }, 

    search: function(key) {
    	
        var current = this.head;
    	
    	while((current != null) && (current.key != key)) {
    		current = current.next;
    	}

    	return current;
    },

    reverse: function() {

        var temp = null;  
        var current = this.head;
      
        while (current != null) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;              
            current = current.prev;
        }      
      
        if(temp != null) { 
            this.head = temp.prev;
        }
    },

    traversal: function() {
        var current = this.head;
        
        while (current != null) {
            alert(current.key);
            current = current.next;
        }
    },
};
