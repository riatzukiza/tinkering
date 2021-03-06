

class Node
{
	constructor( list, data, next, prev )
	{
		this.list = list || null;
		this.data = data || null;
		this.next = next || null;
		this.prev = prev || null;
	}
    get isHead() { return this.prev === null; }
    get isTail() { return this.next === null; }

    unshift( node )
    {
        node.next = this;
        return (this.prev = node);
    }
    insert( node )
    {
        node.next = this.next;
        node.prev = this;
        this.next = node;
        if( node.next ) node.next.prev = node;
        return node;
    }
    push( node )
    {
        node.prev = this;
        return (this.next = node);
    }
    remove()
    {
        this.list.size--;

        if( this.isHead ) this.list.head = this.next;
        if( this.isTail ) this.list.tail = this.prev;

        if( this.next ) this.next.perv = this.prev;
        if( this.prev ) this.prev.next = this.next;

        return this.data;
    }
}

class List
{
	constructor()
	{
		this.head = null;
		this.tail = null;
		this.size = 0;
	}
	get empty()
	{
		return this.size === 0;
	}

    clear()
    {
        this.head = this.tail = null;
        this.size = 0;
    }

    find( condition, all, ruturn_node, run_on_node, result=false )
    {
        if( this.empty ) return false;
        if( all && !result ) result = [];
        let node = this.head;
        while( node )
        {
            if( condition( (run_on_node) ? node : node.data ) )
                if( all )   result.push( (ruturn_node) ? node : node.data );
                else        return (ruturn_node) ? node : node.data;
            node = node.next;
        }
        return result;
    }
    has( data )
    {
        let node = this.head;
        while( node ) if( node.data === data ) return true;
        return false;
    }

    each( action, run_on_node )
    {
        let node = this.head;
        while( node )
        {
            action( (run_on_node) ? node : node.data );
            node = node.next;
        }
        return this;
    }
	push( data )
	{
		if( this.empty ) { this.size++; return (this.head = this.tail = new Node( this, data ));}
		else             { this.size++; return (this.tail = this.tail.push( new Node( this, data, null, this.tail ) )); }
	}
	pop()
    {
        return this.tail.remove();
    }
	unshift( data )
    {
		if( this.empty ) { this.size++; return (this.head = this.tail = new Node( this, data ));}
		else             { this.size++; return (this.head = this.head.unshift( new Node( this, data, this.head, null ) )); }
    }
	shift()
    {
        return this.head.remove();
    }
}
module.exports = {List,Node};
