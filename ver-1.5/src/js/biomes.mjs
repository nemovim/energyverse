export class Biome {
    #biome;
    #pos;

    constructor(_biome, _pos) {
        this.#biome = _biome;
        this.#pos = _pos;
    }

    getPos() {
        return this.#pos;
    }

    getBiome() {
        return this.#biome;
    }

    getType() {
        return this.#biome.type;
    }
}

export class Water extends Biome {
    static type = 'water';

    constructor(pos) {
        super(Water, pos);
    }
}

export class Ground extends Biome {
    static type = 'ground';

    constructor(pos) {
        super(Ground, pos);
    }
}

export class Mountain extends Biome {
    static type = 'mountain';

    constructor(pos) {
        super(Mountain, pos);
    }
}

export class Fuel extends Biome {
    static type = 'fuel';

    #amount;

    constructor(pos, _amount) {
        super(Fuel, pos);
        this.#amount = _amount;
    }

    setAmount(_amount) {
        this.#amount = Number(_amount);
    }

    getAmount() {
        return this.#amount;
    }

    modifyAmount(delta) {
        this.#amount += Number(delta);
    }
}

export const Biomes = {
    water: Water,
    ground: Ground,
    mountain: Mountain,
    fuel: Fuel,
};
