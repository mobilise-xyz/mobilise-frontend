import metricConstants from '../_constants/metric.constants';

const metric = (state = {}, action) => {
  switch (action.type) {
    case metricConstants.GET: {
      return {
        metric: action.metric
      };
    }
    default: {
      return state;
    }
  }
};

export default metric;
