	function RedBlackTree() {	
		this.nodes = 0;
		this.nil = {
			key: null,
			color: "black"
		};
		this.root = this.nil;	
	}

	RedBlackTree.prototype = {
	
	leftRotate: function(node) {
    	
    	var pivot = node.right;
    	node.right = pivot.left;
    	pivot.left.parent = node;
    	pivot.parent = node.parent;
    	
    	if (node.parent == this.nil) {
    		this.root = pivot;
    	}
    	
    	else if (node == node.parent.left) {
    		node.parent.left = pivot;
    	}
    	
    	else {
    		node.parent.right = pivot;
    	}
    	
    	pivot.left = node;
    	node.parent = pivot;
    },

    rightRotate: function(node) {
    	
    	var pivot = node.left;
    	node.left = pivot.right;
    	pivot.right.parent = node;
    	pivot.parent = node.parent;
    	
    	if (node.parent == this.nil) {
    		this.root = pivot;
    	}
    	
    	else if (node == node.parent.left) {
    		node.parent.left = pivot;
    	}
    	
    	else {
    		node.parent.right = pivot;
    	}
    	
    	pivot.right = node;
    	node.parent = pivot;
    },

    treeFixUp: function(node) {
    	
    	while (node.parent.color == "red") {	
    		
    		if (node.parent == node.parent.parent.left) {
				
				var temp = node.parent.parent.right;
    			
    			if (temp.color == "red") {
    				node.parent.color = "black";
					temp.color = "black";
					node.parent.parent.color = "red";
					node = node.parent.parent;
    			}
    			
    			else {
    				
    				if (node == node.parent.right) {
    					node = node.parent;
    					leftRotate(node);
    				}
    				
    				node.parent.color = "black";
					node.parent.parent.color = "red";
					this.rightRotate(node.parent.parent);
				}
    		}
    		
    		else if (node.parent == node.parent.parent.right){
				
				var temp = node.parent.parent.left;
				
				if (temp.color == "red") {
    				node.parent.color = "black";
					temp.color = "black";
					node.parent.parent.color = "red";
					node = node.parent.parent;
    			}
    			
    			else {
    				
    				if (node == node.parent.left) {
    					node = node.parent;
    					this.rightRotate(node);
    				}
					
					node.parent.color = "black";
					node.parent.parent.color = "red";
					this.leftRotate(node.parent.parent);
    			}
    		}
    		this.root.color = "black";
    	}
    },

	insert: function (key) {

        var node = {
                key: parseInt(key),
                left: this.nil,
                right: this.nil,
                parent: this.nil,
                color: "red"
            };
      
    	var current = this.root;
        var currentParent = this.nil;
        
        while (current != this.nil) {
        	currentParent = current;
        	
            if (node.key < current.key) {
        		current = current.left;
        	}
        	
            else {
        		current = current.right;
        	}
        }
        	
        node.parent = currentParent;
        
        if (currentParent == this.nil) {
        	this.root = node;
        }
        
        else if (node.key < currentParent.key) {
        	currentParent.left = node;
        }
        	
        else {
        	currentParent.right = node;
        }
        this.treeFixUp(node);
        this.nodes++;
    },

    min: function(node) {
    	while (node.left != null) {
    		node = node.left;
    	}
    	return node;
    },

    max: function(node) {
    	while (node.right != null) {
    		node = node.right;
    	}
    	return node;
    },

    search: function(key) {
    	var count = 0;
    	var current = this.root;
    	
        while ((current != null) && (key != current.key)) {
    		if (key < current.key) {
    			current = current.left;	
    		}
			else {
				current = current.right;
			}
			count++;
    	}
		return current;
    },

    successor: function(node) {
    	if (node.right != null) {
    		return this.min(node.right);
    	}
    	
        var nodeParent = node.parent;
    	
        while((nodeParent != null) && (node == nodeParent.right)) {
    		node = nodeParent;
    		nodeParent = nodeParent.parent;
    	}
    	return nodeParent;
    },

    predecessor: function(node) {
    	if (node.left != null) {
    		return this.max(node.left);
    	}
    	
        var nodeParent = node.parent;
    	
        while ((nodeParent != null) && (node == nodeParent.left)) {
    		node = nodeParent;
    		nodeParent = nodeParent.parent;
    	}
    	return nodeParent;
    },

//BST deletion

    delete: function(x) {
    	var y = "";
    	var z = "";
    	if ((x.left == null) || (x.right == null)) {
    		y = x;
    	}
    	else {
    		y = this.treeSuccessor(x);
    	}
    	if (y.left != null) {
    		z = y.left;
    	}
    	else {
    		z = y.right;
    	}
    	if (z != null) {
    		z.parent = y.parent;
    	}
    	if (y.parent == null) {
    		this.root = z;
    	}
		else if (y == y.parent.left ){
			y.parent.left = z;
		}
		else {
			y.parent.right = z;
		}
		if (y != x) {
			x.key = y.key;
		}
		x.parent = y.parent;
		x.left = y.left;
		x.right = y.right;
		this.nodes--;
    },

    inOrderTraversal: function(node) {
    	if (node != null) {
    		this.inOrderTraversal(node.left);
    		alert(node.key);
   			this.inOrderTraversal(node.right);    		
    	}
    },

    preOrderTraversal: function(node) {
    	if (node != null) {
    		alert(node.key);
    		this.inOrderTraversal(node.left);
    		this.inOrderTraversal(node.right);
    	}
    },
   
    postOrderTraversal: function(node) {
		if (node != null) {
			this.inOrderTraversal(node.left);
		    this.inOrderTraversal(node.right);
		    alert(node.key);
		}
    },

    levelOrderTraversal: function(node) {
        var q = new Array();
        q.push(node);
        
        while (q.length > 0) {
            var node = q.shift();
            alert(node.key);
            
            if (node.left != null) {
                q.push(node.left);
            }
            
            if (node.right != null) {
                q.push(node.right);
            }
        }
    },

    countNodes: function() {
    	return this.nodes;
    },

    treeHeight: function(node) {
    	if (node == null) {
    		return -1;
    	}

	    var leftHeight = this.treeHeight(node.left);
	    var rightHeight = this.treeHeight(node.right);

	    if (leftHeight > rightHeight) {
	    	return leftHeight + 1;
	    }
	    else { 
	    	return rightHeight +1
	    }
    }
};