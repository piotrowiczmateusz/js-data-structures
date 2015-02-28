function BST() {
		this.root = null;
		this.nodes = 0;
	}

BST.prototype = {

    insert: function (key) {

        var node = {
                key: parseInt(key),
                left: null,
                right: null,
                parent: null
            };
      
    	var current = this.root;
        var currentParent = null;
        
        while (current != null) {
        	currentParent = current;
        	
            if (node.key < current.key) {
        		current = current.left;
        	}
        	
            else {
        		current = current.right;
        	}
        }
        	
        node.parent = currentParent;
        
        if (currentParent == null) {
        	this.root = node;
        }
        
        else if (node.key < currentParent.key) {
        	currentParent.left = node;
        }
        	
        else {
        	currentParent.right = node;
        }
        
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

    delete: function(node) {
    	var y = "";
    	var z = "";
    	
    	if ((node.left == null) || (node.right == null)) {
    		y = node;
    	}
    	else {
    		y = this.successor(node);
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
		else if (y == y.parent.left ) {
			y.parent.left = z;
		}
		else {
			y.parent.right = z;
		}
		if (y != node) {
			node.key = y.key;
		}
		node.parent = y.parent;
		node.left = y.left;
		node.right = y.right;
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
	    	return rightHeight +1;
	    }
    }
};