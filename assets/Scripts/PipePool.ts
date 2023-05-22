import { _decorator, Component, Node, Prefab, NodePool, instantiate } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PipePool")
export class PipePool extends Component {
  @property({
    type: Prefab,
  })
  public prefabPipes = null;

  @property({
    type: Node,
  })
  public pipePoolHome = null;

  public pool = new NodePool();
  public pipePrefab: Node = null;

  initPool() {
    let initCount = 3;
    for (let i = 0; i < initCount; i++) {
      let createPipe = instantiate(this.prefabPipes);

      if (i == 0) {
        this.pipePoolHome.addChild(createPipe);
      } else {
        this.pool.put(createPipe);
      }
    }
  }

  addPool() {
    if (this.pool.size() > 0) {
      this.pipePrefab = this.pool.get();
    } else {
      this.pipePrefab = instantiate(this.prefabPipes);
    }

    this.pipePoolHome.addChild(this.pipePrefab);
  }

  reset() {
    this.pipePoolHome.removeAllChildren();
    this.pool.clear();
    this.initPool();
  }
}
