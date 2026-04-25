# VkDataGraphPipelineBuiltinModelCreateInfoQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineBuiltinModelCreateInfoQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineBuiltinModelCreateInfoQCOM - Structure specifying a built-in model for the newly created data graph pipeline

The `VkDataGraphPipelineBuiltinModelCreateInfoQCOM` structure is defined
as:

// Provided by VK_QCOM_data_graph_model
typedef struct VkDataGraphPipelineBuiltinModelCreateInfoQCOM {
    VkStructureType                                        sType;
    const void*                                            pNext;
    const VkPhysicalDeviceDataGraphOperationSupportARM*    pOperation;
} VkDataGraphPipelineBuiltinModelCreateInfoQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pOperation` is a [VkPhysicalDeviceDataGraphOperationSupportARM](VkPhysicalDeviceDataGraphOperationSupportARM.html)
specifying the built-in operation.

The `pipelineCache` is ignored for the creation of this pipeline.

Applications **can** specify arguments to the built-in operation named in
`pOperation` with [VkDataGraphPipelineCompilerControlCreateInfoARM](VkDataGraphPipelineCompilerControlCreateInfoARM.html).

Applications **should** verify that the `pVendorOptions`, `layout`, and
other state included with this pipeline creation are compatible with the
`pOperation`.
Implementations **may** fail if any state is not compatible and return
[VK_PIPELINE_COMPILE_REQUIRED](VkResult.html).

|  | Built-in models are defined by the provider of the model, therefore Vulkan
| --- | --- |
does not define model compatibility.
The application should refer to the provider of the built-in model for
guidance on compatibility. |

Valid Usage

* 
[](#VUID-VkDataGraphPipelineBuiltinModelCreateInfoQCOM-pOperation-11842) VUID-VkDataGraphPipelineBuiltinModelCreateInfoQCOM-pOperation-11842

All members of `pOperation` **must** be identical to a
[VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html)::`operation` retrieved
from [vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM.html) with the
`physicalDevice` that was used to create `device` and paired in
the retrieved results with a
[VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html)::`engine` identical to an
element of
[VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html)::`pProcessingEngines`
provided in the `pNext` chain

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineBuiltinModelCreateInfoQCOM-sType-sType) VUID-VkDataGraphPipelineBuiltinModelCreateInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_BUILTIN_MODEL_CREATE_INFO_QCOM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineBuiltinModelCreateInfoQCOM-pOperation-parameter) VUID-VkDataGraphPipelineBuiltinModelCreateInfoQCOM-pOperation-parameter

 `pOperation` **must** be a valid pointer to a valid [VkPhysicalDeviceDataGraphOperationSupportARM](VkPhysicalDeviceDataGraphOperationSupportARM.html) structure

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html)

[VK_QCOM_data_graph_model](VK_QCOM_data_graph_model.html), [VkPhysicalDeviceDataGraphOperationSupportARM](VkPhysicalDeviceDataGraphOperationSupportARM.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineBuiltinModelCreateInfoQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
