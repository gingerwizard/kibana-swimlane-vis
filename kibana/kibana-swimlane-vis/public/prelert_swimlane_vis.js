/*
 ****************************************************************************
 *                                                                          *
 * Copyright 2016 Prelert Ltd                                          *
 *                                                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 *    http://www.apache.org/licenses/LICENSE-2.0                            *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 *                                                                          *
 ****************************************************************************
 */
import 'plugins/prelert_swimlane_vis/prelert_swimlane_vis.less';
import 'plugins/prelert_swimlane_vis/prelert_swimlane_vis_controller.js'
import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import swimlineVisTemplate from 'plugins/prelert_swimlane_vis/prelert_swimlane_vis.html';
import VisSchemasProvider from 'ui/vis/schemas';
import swimlineVisParamsTemplate from 'plugins/prelert_swimlane_vis/prelert_swimlane_vis_params.html';

define(function(require) {

  // Register the PrelertSwimlaneVisProvider with the visualization registry.
  require('ui/registry/vis_types').register(PrelertSwimlaneVisProvider);

  function PrelertSwimlaneVisProvider(Private) {
    var TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
    var Schemas = Private(VisSchemasProvider);

    // Return a new instance describing this visualization.
    return new TemplateVisType({
      name : 'prelert_swimlane',
      title : 'Swimlane',
      icon : 'fa-bars',
      description : 'Swimlane visualization displaying the behavior of a metric ' +
                    'over time across a field from the results.' +
                    'Each lane displays a different value of the field, with the ' +
                    'color of each symbol either based on the relative size of the metric ' +
                    'over each interval indicated or by a discrete value. ' +
                    'Created by Prelert for Behavioral Analytics www.prelert.com.  Adapted by' +
                    'Elasticsearch for Training Demonstration.',
      template : swimlineVisTemplate,
      params : {
        editor : swimlineVisParamsTemplate,
        defaults : {
          interval : { display : 'Auto', val : 'auto' },
          lowThreshold: 0,
          warningThreshold: 3,
          minorThreshold: 25,
          majorThreshold: 50,
          criticalThreshold: 75,
          tooltipNumberFormat: '0.0'
        },
        intervalOptions: [{display:'Auto', val:'auto'},
                          {display:'5 minutes', val:'custom', customInterval:'5m'},
                          {display:'10 minutes', val:'custom', customInterval:'10m'},
                          {display:'30 minutes', val:'custom', customInterval:'30m'},
                          {display:'1 hour', val:'h'},
                          {display:'3 hours', val:'custom', customInterval:'3h'},
                          {display:'12 hours', val:'custom', customInterval:'12h'},
                          {display:'1 day', val:'d'}]
      },
      schemas : new Schemas([ {
        group : 'metrics',
        name : 'metric',
        title : 'Value',
        min : 1,
        max : 1,
        aggFilter : [ 'count', 'avg', 'sum', 'min', 'max' ]
      }, {
        group : 'buckets',
        name : 'viewBy',
        icon : 'fa fa-eye',
        title : 'View by',
        mustBeFirst : true,
        min : 0,
        max : 1,
        aggFilter : 'terms'
      },
      {
      group : 'buckets',
      name : 'timeSplit',
      icon : 'fa fa-th',
      title : 'Time field',
      min : 1,
      max : 1,
      aggFilter : 'date_histogram'
      } ])
    });
  }

  // export the provider so that the visType can be required with Private()
  return PrelertSwimlaneVisProvider;

});
