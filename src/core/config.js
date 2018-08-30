import {isProduction} from 'core/common';
import Development from 'configs/development.json';
import Production from 'configs/production.json';

const Config = isProduction() ? Production : Development;

export default Config;
