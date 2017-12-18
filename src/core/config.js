import {isProduction} from 'core/common';
import * as Development from 'configs/development.json';
import * as Production from 'configs/production.json';

const Config = isProduction() ? Production : Development;

export default Config;
