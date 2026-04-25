# VkDataGraphPipelineCreateInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineCreateInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineCreateInfoARM - Structure specifying parameters of a newly created data graph pipeline

The `VkDataGraphPipelineCreateInfoARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineCreateInfoARM {
    VkStructureType                              sType;
    const void*                                  pNext;
    VkPipelineCreateFlags2                       flags;
    VkPipelineLayout                             layout;
    uint32_t                                     resourceInfoCount;
    const VkDataGraphPipelineResourceInfoARM*    pResourceInfos;
} VkDataGraphPipelineCreateInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineCreateFlagBits2KHR](VkPipelineCreateFlagBits2.html)
specifying how the pipeline will be generated.

* 
`layout` is the description of binding locations used by both the
pipeline and descriptor sets used with the pipeline.

* 
`resourceInfoCount` is the length of the `pResourceInfos` array.

* 
`pResourceInfos` is a pointer to an array of
[VkDataGraphPipelineResourceInfoARM](VkDataGraphPipelineResourceInfoARM.html) structures.

Applications **can** create a data graph pipeline entirely from data present in
a pipeline cache.
This is done by including a [VkDataGraphPipelineIdentifierCreateInfoARM](VkDataGraphPipelineIdentifierCreateInfoARM.html)
structure in the `pNext` chain.
If the required data is not found in the pipeline cache, creating the data
graph pipeline is not possible and the implementation **must** fail as
specified by [VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](VkPipelineCreateFlagBits.html).

Applications **can** create a data graph pipeline without providing a pipeline
cache or shader module by invoking one of the models provided by the
implementation.
This is done by including
[VkDataGraphPipelineBuiltinModelCreateInfoQCOM](VkDataGraphPipelineBuiltinModelCreateInfoQCOM.html) in the `pNext`
chain.

When an identifier
or built-in model
is used to create a data graph pipeline, implementations **may** fail pipeline
creation with [VK_PIPELINE_COMPILE_REQUIRED](VkResult.html) for any reason.

The data graph engines for this pipeline **can** be selected by including a
[VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) to the `pNext` chain of
this structure.
Otherwise,
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_DEFAULT_ARM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html) will
be used as the sole data graph engine.

The data graph operations that this pipeline uses **must** be supported for the
data graph engines selected for this pipeline as retrieved by
[vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM.html).

Valid Usage

* 
[](#VUID-VkDataGraphPipelineCreateInfoARM-pNext-09977) VUID-VkDataGraphPipelineCreateInfoARM-pNext-09977

One and only one of the following structures **must** be included in the
`pNext` chain:

[VkDataGraphPipelineShaderModuleCreateInfoARM](VkDataGraphPipelineShaderModuleCreateInfoARM.html)

* 
[VkDataGraphPipelineIdentifierCreateInfoARM](VkDataGraphPipelineIdentifierCreateInfoARM.html)

* 
[VkDataGraphPipelineBuiltinModelCreateInfoQCOM](VkDataGraphPipelineBuiltinModelCreateInfoQCOM.html)

* 
[VkDataGraphPipelineSingleNodeCreateInfoARM](VkDataGraphPipelineSingleNodeCreateInfoARM.html)

[](#VUID-VkDataGraphPipelineCreateInfoARM-flags-09764) VUID-VkDataGraphPipelineCreateInfoARM-flags-09764

`flags` **may** only contain
[VK_PIPELINE_CREATE_2_NO_PROTECTED_ACCESS_BIT_EXT](VkPipelineCreateFlagBits2.html),
[VK_PIPELINE_CREATE_2_PROTECTED_ACCESS_ONLY_BIT_EXT](VkPipelineCreateFlagBits2.html),
[VK_PIPELINE_CREATE_2_DISABLE_OPTIMIZATION_BIT](VkPipelineCreateFlagBits2.html),
[VK_PIPELINE_CREATE_2_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits2.html),
[VK_PIPELINE_CREATE_2_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT_KHR](VkPipelineCreateFlagBits2.html) or
[VK_PIPELINE_CREATE_2_EARLY_RETURN_ON_FAILURE_BIT_KHR](VkPipelineCreateFlagBits2.html)

[](#VUID-VkDataGraphPipelineCreateInfoARM-layout-09767) VUID-VkDataGraphPipelineCreateInfoARM-layout-09767

`layout` **must** have been created with `pushConstantRangeCount`
equal to 0 and `pPushConstantRanges` equal to `NULL`

[](#VUID-VkDataGraphPipelineCreateInfoARM-dataGraphUpdateAfterBind-09768) VUID-VkDataGraphPipelineCreateInfoARM-dataGraphUpdateAfterBind-09768

If the
[`dataGraphUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-dataGraphUpdateAfterBind)
feature is not enabled, `layout` must not use any
[VkDescriptorSetLayout](VkDescriptorSetLayout.html) object created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set

[](#VUID-VkDataGraphPipelineCreateInfoARM-dataGraphDescriptorBuffer-09885) VUID-VkDataGraphPipelineCreateInfoARM-dataGraphDescriptorBuffer-09885

If the
[`dataGraphDescriptorBuffer`](../../../../spec/latest/chapters/features.html#features-dataGraphDescriptorBuffer)
feature is not enabled, `flags` **must** not contain
[VK_PIPELINE_CREATE_2_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits2.html)

[](#VUID-VkDataGraphPipelineCreateInfoARM-layout-09769) VUID-VkDataGraphPipelineCreateInfoARM-layout-09769

If a [VkDataGraphPipelineShaderModuleCreateInfoARM](VkDataGraphPipelineShaderModuleCreateInfoARM.html) structure is
included in the `pNext` chain and a [resource    variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in the shader module, the corresponding
descriptor binding used to create `layout` **must** have a
`descriptorType` that corresponds to the type of the
[resource variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources)

[](#VUID-VkDataGraphPipelineCreateInfoARM-None-11840) VUID-VkDataGraphPipelineCreateInfoARM-None-11840

    If a [VkDataGraphPipelineIdentifierCreateInfoARM](VkDataGraphPipelineIdentifierCreateInfoARM.html)
or a [VkDataGraphPipelineBuiltinModelCreateInfoQCOM](VkDataGraphPipelineBuiltinModelCreateInfoQCOM.html)
    structure is included in the `pNext` chain, then `flags` **must**
    contain [VK_PIPELINE_CREATE_2_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](VkPipelineCreateFlagBits2.html)

[](#VUID-VkDataGraphPipelineCreateInfoARM-None-12363) VUID-VkDataGraphPipelineCreateInfoARM-None-12363

    If a [VkDataGraphPipelineIdentifierCreateInfoARM](VkDataGraphPipelineIdentifierCreateInfoARM.html)
or a [VkDataGraphPipelineBuiltinModelCreateInfoQCOM](VkDataGraphPipelineBuiltinModelCreateInfoQCOM.html)
    structure is included in the `pNext` chain, then
    `resourceInfoCount` **must** be 0

[](#VUID-VkDataGraphPipelineCreateInfoARM-resourceInfoCount-12364) VUID-VkDataGraphPipelineCreateInfoARM-resourceInfoCount-12364

If `resourceInfoCount` is equal to 0, then `pResourceInfos`
**must** equal `NULL`

[](#VUID-VkDataGraphPipelineCreateInfoARM-None-12365) VUID-VkDataGraphPipelineCreateInfoARM-None-12365

    If
neither
    a [VkDataGraphPipelineIdentifierCreateInfoARM](VkDataGraphPipelineIdentifierCreateInfoARM.html)
nor a [VkDataGraphPipelineBuiltinModelCreateInfoQCOM](VkDataGraphPipelineBuiltinModelCreateInfoQCOM.html)
    structure
are
    included in the `pNext` chain, then `resourceInfoCount` **must** be
    greater than 0

[](#VUID-VkDataGraphPipelineCreateInfoARM-dataGraphShaderModule-09886) VUID-VkDataGraphPipelineCreateInfoARM-dataGraphShaderModule-09886

If the [`dataGraphShaderModule`](../../../../spec/latest/chapters/features.html#features-dataGraphShaderModule)
feature is not enabled, a
[VkDataGraphPipelineShaderModuleCreateInfoARM](VkDataGraphPipelineShaderModuleCreateInfoARM.html) structure **must** not
be included in the `pNext` chain

[](#VUID-VkDataGraphPipelineCreateInfoARM-layout-09934) VUID-VkDataGraphPipelineCreateInfoARM-layout-09934

If a [VkDataGraphPipelineShaderModuleCreateInfoARM](VkDataGraphPipelineShaderModuleCreateInfoARM.html) structure is
included in the `pNext` chain and an array
[resource variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in the shader
module, the corresponding descriptor binding used to create `layout`
**must** have a `descriptorCount` that is greater than or equal to the
length of the array

[](#VUID-VkDataGraphPipelineCreateInfoARM-pipelineCreationCacheControl-09871) VUID-VkDataGraphPipelineCreateInfoARM-pipelineCreationCacheControl-09871

If the [    `pipelineCreationCacheControl`](../../../../spec/latest/chapters/features.html#features-pipelineCreationCacheControl) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CREATE_2_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT_KHR](VkPipelineCreateFlagBits2.html) or
[VK_PIPELINE_CREATE_2_EARLY_RETURN_ON_FAILURE_BIT_KHR](VkPipelineCreateFlagBits2.html)

[](#VUID-VkDataGraphPipelineCreateInfoARM-pSetLayouts-09770) VUID-VkDataGraphPipelineCreateInfoARM-pSetLayouts-09770

The descriptor set layouts in
[VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)::`pSetLayouts` used to create
`layout` **must** not include any [VkDescriptorSetLayoutBinding](VkDescriptorSetLayoutBinding.html)
whose descriptor type is [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html)

[](#VUID-VkDataGraphPipelineCreateInfoARM-pipelineProtectedAccess-09772) VUID-VkDataGraphPipelineCreateInfoARM-pipelineProtectedAccess-09772

If the
[`pipelineProtectedAccess`](../../../../spec/latest/chapters/features.html#features-pipelineProtectedAccess)
feature is not enabled, `flags` **must** not include
[VK_PIPELINE_CREATE_2_NO_PROTECTED_ACCESS_BIT_EXT](VkPipelineCreateFlagBits2.html) or
[VK_PIPELINE_CREATE_2_PROTECTED_ACCESS_ONLY_BIT_EXT](VkPipelineCreateFlagBits2.html)

[](#VUID-VkDataGraphPipelineCreateInfoARM-flags-09773) VUID-VkDataGraphPipelineCreateInfoARM-flags-09773

`flags` **must** not include both
[VK_PIPELINE_CREATE_2_NO_PROTECTED_ACCESS_BIT_EXT](VkPipelineCreateFlagBits2.html) and
[VK_PIPELINE_CREATE_2_PROTECTED_ACCESS_ONLY_BIT_EXT](VkPipelineCreateFlagBits2.html)

[](#VUID-VkDataGraphPipelineCreateInfoARM-pNext-09804) VUID-VkDataGraphPipelineCreateInfoARM-pNext-09804

If the `pNext` chain includes an
[VkPipelineCreationFeedbackCreateInfo](VkPipelineCreationFeedbackCreateInfo.html) structure, then its
`pipelineStageCreationFeedbackCount` **must** be 0

[](#VUID-VkDataGraphPipelineCreateInfoARM-pNext-09948) VUID-VkDataGraphPipelineCreateInfoARM-pNext-09948

If a [VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) structure is
included in the `pNext` chain, each member of
`pProcessingEngines` **must** be identical to an
[VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html)::`engine` retrieved from
[vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM.html) with the
`physicalDevice` that was used to create `device`

[](#VUID-VkDataGraphPipelineCreateInfoARM-pNext-09949) VUID-VkDataGraphPipelineCreateInfoARM-pNext-09949

If a [VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) structure is not
included in the `pNext` chain,
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_DEFAULT_ARM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html)
**must** be set in an
[VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html)::`engine` retrieved from
[vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM.html) with the
`physicalDevice` that was used to create `device`

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineCreateInfoARM-sType-sType) VUID-VkDataGraphPipelineCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_CREATE_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineCreateInfoARM-pNext-pNext) VUID-VkDataGraphPipelineCreateInfoARM-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDataGraphPipelineBuiltinModelCreateInfoQCOM](VkDataGraphPipelineBuiltinModelCreateInfoQCOM.html), [VkDataGraphPipelineCompilerControlCreateInfoARM](VkDataGraphPipelineCompilerControlCreateInfoARM.html), [VkDataGraphPipelineIdentifierCreateInfoARM](VkDataGraphPipelineIdentifierCreateInfoARM.html), [VkDataGraphPipelineOpticalFlowCreateInfoARM](VkDataGraphPipelineOpticalFlowCreateInfoARM.html), [VkDataGraphPipelineShaderModuleCreateInfoARM](VkDataGraphPipelineShaderModuleCreateInfoARM.html), [VkDataGraphPipelineSingleNodeCreateInfoARM](VkDataGraphPipelineSingleNodeCreateInfoARM.html), [VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html), [VkPipelineCreationFeedbackCreateInfo](VkPipelineCreationFeedbackCreateInfo.html), or [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html)

* 
[](#VUID-VkDataGraphPipelineCreateInfoARM-sType-unique) VUID-VkDataGraphPipelineCreateInfoARM-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDataGraphPipelineCreateInfoARM-flags-parameter) VUID-VkDataGraphPipelineCreateInfoARM-flags-parameter

 `flags` **must** be a valid combination of [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html) values

* 
[](#VUID-VkDataGraphPipelineCreateInfoARM-layout-parameter) VUID-VkDataGraphPipelineCreateInfoARM-layout-parameter

 `layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-VkDataGraphPipelineCreateInfoARM-pResourceInfos-parameter) VUID-VkDataGraphPipelineCreateInfoARM-pResourceInfos-parameter

 If `resourceInfoCount` is not `0`, `pResourceInfos` **must** be a valid pointer to an array of `resourceInfoCount` valid [VkDataGraphPipelineResourceInfoARM](VkDataGraphPipelineResourceInfoARM.html) structures

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelineResourceInfoARM](VkDataGraphPipelineResourceInfoARM.html), [VkPipelineCreateFlags2](VkPipelineCreateFlags2.html), [VkPipelineLayout](VkPipelineLayout.html), [VkStructureType](VkStructureType.html), [vkCreateDataGraphPipelinesARM](vkCreateDataGraphPipelinesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineCreateInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
