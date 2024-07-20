const Action = require('../schemas/Action');
const axios = require('axios');
const config = require('../msdata/config.json');
const logger = require('../logger');


const postGreymass = async () => {
    logger.info(`[START] postGreymass`);
    try {
        const response = await axios.post(config.greymass.url, config.greymass.body);
        return response.data
    } catch (error) {
        logger.error("[ERROR] postGreymass", error);
        throw error
    }
}


exports.fetchAndSaveActions = async () => {
    logger.info(`[START] fetchAndSaveActions`);
    try {
        const response = await postGreymass();

        const actions = response.actions.map(action => ({
            trx_id: action.action_trace.trx_id,
            block_time: action.action_trace.block_time,
            block_num: action.action_trace.block_num
        }));

        for (const action of actions) {
            try {
                await Action.updateOne(
                    { trx_id: action.trx_id },
                    { $setOnInsert: action },
                    { upsert: true }
                );
            } catch (error) {
                logger.error('[FAILED] Failed to save action', error);
                throw error
            }
        }

        logger.info('[SUCCESS] Actions fetched and saved');
    } catch (error) {
        logger.error('[FAILED] Failed to fetch actions', error);
        if(error.status || error.response.status || error.data.status){
            logger.error('[ERROR] The service is not available https://eos.greymass.com', error);
            throw error
        }
        throw error
    }
};