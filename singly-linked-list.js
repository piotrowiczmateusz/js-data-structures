function SinglyLinkedList() {
    		this.head = null;
            this.nodes = 0;
	}
	
SinglyLinkedList.prototype = {
	   
    insertBeggining: function (key){

        var node = {
                key: key,
                next: null
            };
        
            node.next = this.head;
            this.head = node;
            this.nodes++;
    },

    insertEnd: function (key){

        var node = {
                key: key,
                next: null
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
        }
        this.nodes++;
    },

    insertAfter: function(key, current) {		
		var node = {
                key: key,
                next: null
            };

		node.next = current.next;
		current.next = node;
		this.nodes++;
    },

    removeAfter: function(current) {
		current.next = current.next.next;
    	this.nodes--;
    },

    removeBeggining: function() {
    	this.head = this.head.next;
    	this.nodes--;
    },

    search: function(key) {
    	
        var current = this.head;
    	
    	while((current != null) && (current.key != key)) {
    		current = current.next;
    	}

    	return current;
    },

    reverse: function(){
        var n = null;
        var head = this.head;
        
        while (head != null) {
            var current = head.next;
            head.next = n;
            n = head;
            head = current;
        }
        this.head = n;
    },

    traversal: function() {
        var current = this.head;
        
        while (current != null) {
            alert(current.key);
            current = current.next;
        }
    }
};