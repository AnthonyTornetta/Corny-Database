const fs = require('fs');

module.exports = class
{
    /**
     * Stores data in a fancy javascript way
     * @param databaseName What to save the database as. This should be a unique name for each different database
     */
    constructor(databaseName)
    {
        this._databaseName = databaseName;

        if(fs.existsSync(this.dataFile))
        {
            let fileData = fs.readFileSync(this.dataFile, 'utf8');
            if(fileData.trim().length !== 0)
                this._data = JSON.parse(fileData);
            else
                this._data = {};
        }
        else
            this._data = {};
    }

    /**
     * Saves the database's data to persistent a json file
     * @param callback Called once it is finished saving, and if there is an error it is passed as the first argument
     */
    async save(callback)
    {
        if(!fs.existsSync(`./database/`))
            fs.mkdirSync(`./database/`);
        if(!fs.existsSync(`./database/${this.databaseName}/`))
            fs.mkdirSync(`./database/${this.databaseName}/`);

        fs.writeFile(this.dataFile, JSON.stringify(this.data), err =>
        {
            if(err && callback)
                callback(err);
            else if(callback)
                callback(undefined);
        });
    }

    /**
     * Saves the database's data to persistent a json file seperate from the save file
     * @param callback Called once it is finished saving, and if there is an error it is passed as the first argument
     */
    async backup(callback)
    {
        if(!fs.existsSync(`./database/`))
            fs.mkdirSync(`./database/`);
        if(!fs.existsSync(`./database/${this.databaseName}-backup/`))
            fs.mkdirSync(`./database/${this.databaseName}-backup/`);

        fs.writeFile(`database/${this.databaseName}-backup/data.json`, JSON.stringify(this.data), err =>
        {
            if(err && callback)
                callback(err);
            else if(callback)
                callback(undefined);
        });
    }

    /**
     * The data that is in that category, or undefined if no data
     * @param category The category to get the data from
     * @returns Data that was found in that category, or undefinined if no data was there
     */
    getData(...category)
    {
        if(category)
        {
            let accessor = this.data;

            for(let i = 0; i < category.length; i++)
            {
                accessor = accessor[category[i]];
                if(!accessor)
                    throw new Error('Category: ' + category + ' was not found!');
            }

            return accessor;
        }
        return undefined;
    }

    /**
     * Returns true if data is found in that category, false if not
     * @param category The category to see if any data is contained
     * @returns true if data found, false if not
     */
    containsData(...category)
    {
        if(category)
        {
            let accessor = this.data;

            for(let i = 0; i < category.length; i++)
            {
                accessor = accessor[category[i]];
                if(!accessor)
                    return false;
            }
            return true;
        }
        return false;
    }

    /**
     * Sets the data value for a given category
     * @param newData The data to set in that category - overrides any data already present there
     * @param category The category to set the data in.  Each sub category is passed as another argument
     * @returns True if data was successfully set, false if not
     */
    setData(newData, ...category)
    {
        if(category)
        {
            let accessor = this.data;

            for(let i = 0; i < category.length; i++)
            {
                if(i + 1 === category.length)
                    accessor[category[i]] = newData;
                else
                {
                    if(!accessor[category[i]])
                        accessor[category[i]] = {};

                    accessor = accessor[category[i]];
                }
            }

            this.save();
            return true;
        }
        else
            return false;
    }

    // Getters & Setters //

    get databaseName() { return this._databaseName; }

    get dataFile() { return `database/${this.databaseName}/data.json`; }

    get data() { return this._data; }
    set data(d) { this._data = d; this.save(); }
}
