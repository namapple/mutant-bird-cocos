import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {
    @property({
        type: Prefab,
        tooltip: 'The prefab of pipes'
    })
    public prefabPipes = null;

    @property({
        type: Node,
        tooltip: 'Where the new pipes go'
    })
    public pipePoolHome;

    // Create initial properties
    public pool = new NodePool;
    public createPipe: Node = null;

    initPool() {
        // Build the amount of nodes needed at a time
        let initCount = 3;

        // Fill up the node pool
        for (let i = 0; i < initCount; i++) {
            // Create the new node
            let createPipe = instantiate(this.prefabPipes); // Instantiate means make a copy of the original

            // Put first one on the screen. So make it a child of the canvas.
            if (i == 0) {
                this.pipePoolHome.addChild(createPipe);
            } else {
                // Put others inot the nodePool
                this.pool.put(createPipe);
            }
        }
    }

    addPool() {
        // If the pool is not full, add a new one, esle get the first one in the pool
        if (this.pool.size() > 0) {
            // Get from the pool
            this.createPipe = this.pool.get();
        } else {
            // Build a new one
            this.createPipe = instantiate(this.prefabPipes);
        }

        // Add pipe to game as a node
        this.pipePoolHome.addChild(this.createPipe);
    }

    reset() {
        // Clear pool and reinitialize
        this.pipePoolHome.removeAllChilden();
        this.pool.clear();
        this.initPool();
    }


}


