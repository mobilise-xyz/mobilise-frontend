import metricConstants from '../_constants/metric.constants';

const metric = (state = { loading: true }, action) => {
  switch (action.type) {
    case metricConstants.GET: {
      return {
        loading: false,
        metric: action.metric
      };
    }
    default: {
      return state;
    }
  }
};

export default metric;
