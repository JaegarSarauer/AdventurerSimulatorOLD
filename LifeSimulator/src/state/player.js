import React from 'react';
import { AsyncStorage } from 'react-native';
import { ITEM } from '../definitions/Item';
import { SKILL } from '../definitions/Skill';

const STORES = {
    Items: '@PlayerItems',
    Bank: '@PlayerBank',
    Skills: '@PlayerSkills',
}

const XP_TABLE = [0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973, 4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824, 12031, 13363, 14833, 16456, 18247, 20224, 22406, 24815, 27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333, 111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886, 273742, 302288, 333804, 368599, 407015, 449428, 496254, 547953, 605032, 668051, 737627, 814445, 899257, 992895, 1096278, 1210421, 1336443, 1475581, 1629200, 1798808, 1986068, 2192818, 2421087, 2673114, 2951373, 3258594, 3597792, 3972294, 4385776, 4842295, 5346332, 5902831, 6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 11805606, 13034431];

export class Player {
    constructor() {
        this.items = [];
        this.bank = [];
        this.skills = [{
            name: 'Woodcutting',
            xp: 0,
            level: 1,
        }];
        this.loadData();
        this.autosaveLoop = setInterval(() => {
            this.saveData();
        }, 30000);
    }

    async saveData() {
        try {
            await AsyncStorage.setItem(STORES.Items, JSON.stringify(this.items));
            await AsyncStorage.setItem(STORES.Bank, JSON.stringify(this.bank));
            await AsyncStorage.setItem(STORES.Skills, JSON.stringify(this.skills));
        } catch (error) {
            console.error(error);
        }
    }

    async loadData() {
        try {
            const Items = await AsyncStorage.getItem(STORES.Items);
            if (Items !== null) {
                this.items = JSON.parse(Items);
            }
            const Bank = await AsyncStorage.getItem(STORES.Bank);
            if (Bank !== null) {
                this.bank = JSON.parse(Bank);
            }
            const Skills = await AsyncStorage.getItem(STORES.Skills);
            if (Skills !== null) {
                this.skills = JSON.parse(Skills);
            }
        } catch (error) {
            console.error(error);
        }
    }

    addXP(skill, xp) {
        this.skills[skill.id].xp += xp;
        this.skills[skill.id].level = this.calcLevel(this.skills[skill.id].level, this.skills[skill.id].xp);
    }

    hasLevel(skill, level) {
        return this.skills[skill.id].level >= level;
    }

    calcLevel(curLevel, xp) {
        for (let i = curLevel; i < XP_TABLE.length; i++) {
            if (xp < XP_TABLE[i]) {
                if (xp > XP_TABLE[i - 1]) {
                    return i;
                } else {
                    i -= 2;
                }
            }
        }
        return 1;
    }

    addItem(item, amount = 1) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === item.id) {
                this.items[i].amount += amount;
                return true;
            }
        }
        let add = item;
        add.amount = amount;
        this.items.push(add);
        return true;
    }

    hasItem(item, amount = 1) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === item.id) {
                return this.items[i].amount < amount;
            }
        }
        return false;
    }

    getItemAmount(item) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === item.id) {
                return this.items[i].amount;
            }
        }
        return 0;
    }

    removeItem(item, amount = 1) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === item.id) {
                this.items[i].amount = Math.max(0, this.items[i].amount - amount);
                if (this.items[i].amount <= 0)
                    this.items.splice(i, 1);
            }
        }
    }
}

export const PP = new Player();