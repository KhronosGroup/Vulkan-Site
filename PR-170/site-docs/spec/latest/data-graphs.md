# Data graphs

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/VK_ARM_data_graph/graphs.html

## Table of Contents

- [Pipeline Creation](#graphs-pipelines)
- [Sessions](#_sessions)
- [Dispatch](#_dispatch)
- [Properties](#graphs-properties)
- [Processing Engines](#graphs-processing-engines)
- [Operations](#graphs-operations)

## Content

*Data graph pipelines* encapsulate computational graphs that operate on
whole resources (e.g. tensors).
The [graph operations](#graphs-operations) that form these computational
graphs are executed by [graph processing engines](#graphs-processing-engines).

To create data graph pipelines, call:

// Provided by VK_ARM_data_graph
VkResult vkCreateDataGraphPipelinesARM(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    VkPipelineCache                             pipelineCache,
    uint32_t                                    createInfoCount,
    const VkDataGraphPipelineCreateInfoARM*     pCreateInfos,
    const VkAllocationCallbacks*                pAllocator,
    VkPipeline*                                 pPipelines);

* 
`device` is the logical device that creates the data graph
pipelines.

* 
`deferredOperation` is [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) or the handle of a valid
[VkDeferredOperationKHR](../VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) [    request deferral](../VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) object for this command.

* 
`pipelineCache` is either [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), indicating that
pipeline caching is disabled; or the handle of a valid
[pipeline cache](../pipelines.html#pipelines-cache) object, in which case use of that
cache is enabled for the duration of the command.

* 
`createInfoCount` is the length of the `pCreateInfos` and
`pPipelines` arrays.

* 
`pCreateInfos` is a pointer to an array of
[VkDataGraphPipelineCreateInfoARM](#VkDataGraphPipelineCreateInfoARM) structures.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../memory.html#memory-allocation) chapter.

* 
`pPipelines` is a pointer to an array of [VkPipeline](../pipelines.html#VkPipeline) handles in
which the resulting data graph pipelines objects are returned.

The implementation will create a pipeline in each element of
`pPipelines` from the corresponding element of `pCreateInfos`.
If the creation of any pipeline fails, that pipeline will be set to
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE).

Valid Usage

* 
[](#VUID-vkCreateDataGraphPipelinesARM-dataGraph-09760) VUID-vkCreateDataGraphPipelinesARM-dataGraph-09760

The [`dataGraph`](../features.html#features-dataGraph) feature **must** be enabled

* 
[](#VUID-vkCreateDataGraphPipelinesARM-device-09927) VUID-vkCreateDataGraphPipelinesARM-device-09927

`device` **must** support at least one queue family with the
[VK_QUEUE_DATA_GRAPH_BIT_ARM](../devsandqueues.html#VkQueueFlagBits) capability

* 
[](#VUID-vkCreateDataGraphPipelinesARM-deferredOperation-09761) VUID-vkCreateDataGraphPipelinesARM-deferredOperation-09761

`deferredOperation` **must** be [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCreateDataGraphPipelinesARM-deferredOperation-09916) VUID-vkCreateDataGraphPipelinesARM-deferredOperation-09916

If `deferredOperation` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the `flags`
member of elements of `pCreateInfos` **must** not include
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](../pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCreateDataGraphPipelinesARM-pNext-09928) VUID-vkCreateDataGraphPipelinesARM-pNext-09928

If at least one of the [VkDataGraphPipelineCreateInfoARM](#VkDataGraphPipelineCreateInfoARM) includes a
[VkDataGraphPipelineIdentifierCreateInfoARM](#VkDataGraphPipelineIdentifierCreateInfoARM) structure in its
`pNext` chain then `pipelineCache` **must** not be
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCreateDataGraphPipelinesARM-pipelineCache-09762) VUID-vkCreateDataGraphPipelinesARM-pipelineCache-09762

If `pipelineCache` was created with
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](../pipelines.html#VkPipelineCacheCreateFlagBits), host access
to `pipelineCache` **must** be
[externally synchronized](../fundamentals.html#fundamentals-threadingbehavior)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDataGraphPipelinesARM-device-parameter) VUID-vkCreateDataGraphPipelinesARM-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateDataGraphPipelinesARM-deferredOperation-parameter) VUID-vkCreateDataGraphPipelinesARM-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](../VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) handle

* 
[](#VUID-vkCreateDataGraphPipelinesARM-pipelineCache-parameter) VUID-vkCreateDataGraphPipelinesARM-pipelineCache-parameter

 If `pipelineCache` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `pipelineCache` **must** be a valid [VkPipelineCache](../pipelines.html#VkPipelineCache) handle

* 
[](#VUID-vkCreateDataGraphPipelinesARM-pCreateInfos-parameter) VUID-vkCreateDataGraphPipelinesARM-pCreateInfos-parameter

 `pCreateInfos` **must** be a valid pointer to an array of `createInfoCount` valid [VkDataGraphPipelineCreateInfoARM](#VkDataGraphPipelineCreateInfoARM) structures

* 
[](#VUID-vkCreateDataGraphPipelinesARM-pAllocator-parameter) VUID-vkCreateDataGraphPipelinesARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateDataGraphPipelinesARM-pPipelines-parameter) VUID-vkCreateDataGraphPipelinesARM-pPipelines-parameter

 `pPipelines` **must** be a valid pointer to an array of `createInfoCount` [VkPipeline](../pipelines.html#VkPipeline) handles

* 
[](#VUID-vkCreateDataGraphPipelinesARM-device-queuecount) VUID-vkCreateDataGraphPipelinesARM-device-queuecount

 The device **must** have been created with at least `1` queue

* 
[](#VUID-vkCreateDataGraphPipelinesARM-createInfoCount-arraylength) VUID-vkCreateDataGraphPipelinesARM-createInfoCount-arraylength

 `createInfoCount` **must** be greater than `0`

* 
[](#VUID-vkCreateDataGraphPipelinesARM-deferredOperation-parent) VUID-vkCreateDataGraphPipelinesARM-deferredOperation-parent

 If `deferredOperation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkCreateDataGraphPipelinesARM-pipelineCache-parent) VUID-vkCreateDataGraphPipelinesARM-pipelineCache-parent

 If `pipelineCache` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_PIPELINE_COMPILE_REQUIRED_EXT](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkDataGraphPipelineCreateInfoARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineCreateInfoARM {
    VkStructureType                              sType;
    const void*                                  pNext;
    VkPipelineCreateFlags2KHR                    flags;
    VkPipelineLayout                             layout;
    uint32_t                                     resourceInfoCount;
    const VkDataGraphPipelineResourceInfoARM*    pResourceInfos;
} VkDataGraphPipelineCreateInfoARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineCreateFlagBits2KHR](../pipelines.html#VkPipelineCreateFlagBits2KHR)
specifying how the pipeline will be generated.

* 
`layout` is the description of binding locations used by both the
pipeline and descriptor sets used with the pipeline.

* 
`resourceInfoCount` is the length of the `pResourceInfos` array.

* 
`pResourceInfos` is a pointer to an array of
[VkDataGraphPipelineResourceInfoARM](#VkDataGraphPipelineResourceInfoARM) structures.

Applications **can** create a data graph pipeline entirely from data present in
a pipeline cache.
This is done by including a [VkDataGraphPipelineIdentifierCreateInfoARM](#VkDataGraphPipelineIdentifierCreateInfoARM)
structure in the `pNext` chain.
If the required data is not found in the pipeline cache, creating the data
graph pipeline is not possible and the implementation **must** fail as
specified by [VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](../pipelines.html#VkPipelineCreateFlagBits).

Applications **can** create a data graph pipeline without providing a pipeline
cache or shader module by invoking one of the models provided by the
implementation.
This is done by including
[VkDataGraphPipelineBuiltinModelCreateInfoQCOM](#VkDataGraphPipelineBuiltinModelCreateInfoQCOM) in the `pNext`
chain.

When an identifier
or built-in model
is used to create a data graph pipeline, implementations **may** fail pipeline
creation with [VK_PIPELINE_COMPILE_REQUIRED](../fundamentals.html#VkResult) for any reason.

The data graph engines for this pipeline **can** be selected by including a
[VkDataGraphProcessingEngineCreateInfoARM](#VkDataGraphProcessingEngineCreateInfoARM) to the `pNext` chain of
this structure.
Otherwise,
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_DEFAULT_ARM](#VkPhysicalDeviceDataGraphProcessingEngineTypeARM) will
be used as the sole data graph engine.

The data graph operations that this pipeline uses **must** be supported for the
data graph engines selected for this pipeline as retrieved by
[vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](#vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM).

Valid Usage

* 
[](#VUID-VkDataGraphPipelineCreateInfoARM-pNext-09763) VUID-VkDataGraphPipelineCreateInfoARM-pNext-09763

One and only one of the following structures **must** be included in the
`pNext` chain:

[VkDataGraphPipelineShaderModuleCreateInfoARM](#VkDataGraphPipelineShaderModuleCreateInfoARM)

* 
[VkDataGraphPipelineIdentifierCreateInfoARM](#VkDataGraphPipelineIdentifierCreateInfoARM)

* 
[VkDataGraphPipelineBuiltinModelCreateInfoQCOM](#VkDataGraphPipelineBuiltinModelCreateInfoQCOM)

[](#VUID-VkDataGraphPipelineCreateInfoARM-flags-09764) VUID-VkDataGraphPipelineCreateInfoARM-flags-09764

`flags` **may** only contain
[VK_PIPELINE_CREATE_2_NO_PROTECTED_ACCESS_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR),
[VK_PIPELINE_CREATE_2_PROTECTED_ACCESS_ONLY_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR),
[VK_PIPELINE_CREATE_2_DISABLE_OPTIMIZATION_BIT](../pipelines.html#VkPipelineCreateFlagBits2KHR),
[VK_PIPELINE_CREATE_2_DESCRIPTOR_BUFFER_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR),
[VK_PIPELINE_CREATE_2_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT_KHR](../pipelines.html#VkPipelineCreateFlagBits2KHR) or
[VK_PIPELINE_CREATE_2_EARLY_RETURN_ON_FAILURE_BIT_KHR](../pipelines.html#VkPipelineCreateFlagBits2KHR)

[](#VUID-VkDataGraphPipelineCreateInfoARM-layout-09767) VUID-VkDataGraphPipelineCreateInfoARM-layout-09767

`layout` **must** have been created with `pushConstantRangeCount`
equal to 0 and `pPushConstantRanges` equal to `NULL`

[](#VUID-VkDataGraphPipelineCreateInfoARM-dataGraphUpdateAfterBind-09768) VUID-VkDataGraphPipelineCreateInfoARM-dataGraphUpdateAfterBind-09768

If the
[`dataGraphUpdateAfterBind`](../features.html#features-dataGraphUpdateAfterBind)
feature is not enabled, `layout` must not use any
[VkDescriptorSetLayout](../descriptorsets.html#VkDescriptorSetLayout) object created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](../descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set

[](#VUID-VkDataGraphPipelineCreateInfoARM-dataGraphDescriptorBuffer-09885) VUID-VkDataGraphPipelineCreateInfoARM-dataGraphDescriptorBuffer-09885

If the
[`dataGraphDescriptorBuffer`](../features.html#features-dataGraphDescriptorBuffer)
feature is not enabled, `flags` **must** not contain
[VK_PIPELINE_CREATE_2_DESCRIPTOR_BUFFER_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR)

[](#VUID-VkDataGraphPipelineCreateInfoARM-layout-09769) VUID-VkDataGraphPipelineCreateInfoARM-layout-09769

If a [VkDataGraphPipelineShaderModuleCreateInfoARM](#VkDataGraphPipelineShaderModuleCreateInfoARM) structure is
included in the `pNext` chain and a [resource    variable](../interfaces.html#interfaces-resources) is declared in the shader module, the corresponding
descriptor binding used to create `layout` **must** have a
`descriptorType` that corresponds to the type of the
[resource variable](../interfaces.html#interfaces-resources)

[](#VUID-VkDataGraphPipelineCreateInfoARM-None-11840) VUID-VkDataGraphPipelineCreateInfoARM-None-11840

    If a [VkDataGraphPipelineIdentifierCreateInfoARM](#VkDataGraphPipelineIdentifierCreateInfoARM)
or a [VkDataGraphPipelineBuiltinModelCreateInfoQCOM](#VkDataGraphPipelineBuiltinModelCreateInfoQCOM)
    structure is included in the `pNext` chain, then `flags` **must**
    contain [VK_PIPELINE_CREATE_2_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](../pipelines.html#VkPipelineCreateFlagBits2KHR)

[](#VUID-VkDataGraphPipelineCreateInfoARM-None-12363) VUID-VkDataGraphPipelineCreateInfoARM-None-12363

    If a [VkDataGraphPipelineIdentifierCreateInfoARM](#VkDataGraphPipelineIdentifierCreateInfoARM)
or a [VkDataGraphPipelineBuiltinModelCreateInfoQCOM](#VkDataGraphPipelineBuiltinModelCreateInfoQCOM)
    structure is included in the `pNext` chain, then
    `resourceInfoCount` **must** be 0

[](#VUID-VkDataGraphPipelineCreateInfoARM-resourceInfoCount-12364) VUID-VkDataGraphPipelineCreateInfoARM-resourceInfoCount-12364

If `resourceInfoCount` is equal to 0, then `pResourceInfos`
**must** equal `NULL`

[](#VUID-VkDataGraphPipelineCreateInfoARM-None-12365) VUID-VkDataGraphPipelineCreateInfoARM-None-12365

    If
neither
    a [VkDataGraphPipelineIdentifierCreateInfoARM](#VkDataGraphPipelineIdentifierCreateInfoARM)
nor a [VkDataGraphPipelineBuiltinModelCreateInfoQCOM](#VkDataGraphPipelineBuiltinModelCreateInfoQCOM)
    structure
are
    included in the `pNext` chain, then `resourceInfoCount` **must** be
    greater than 0

[](#VUID-VkDataGraphPipelineCreateInfoARM-dataGraphShaderModule-09886) VUID-VkDataGraphPipelineCreateInfoARM-dataGraphShaderModule-09886

If the [`dataGraphShaderModule`](../features.html#features-dataGraphShaderModule)
feature is not enabled, a
[VkDataGraphPipelineShaderModuleCreateInfoARM](#VkDataGraphPipelineShaderModuleCreateInfoARM) structure **must** not
be included in the `pNext` chain

[](#VUID-VkDataGraphPipelineCreateInfoARM-layout-09934) VUID-VkDataGraphPipelineCreateInfoARM-layout-09934

If a [VkDataGraphPipelineShaderModuleCreateInfoARM](#VkDataGraphPipelineShaderModuleCreateInfoARM) structure is
included in the `pNext` chain and an array
[resource variable](../interfaces.html#interfaces-resources) is declared in the shader
module, the corresponding descriptor binding used to create `layout`
**must** have a `descriptorCount` that is greater than or equal to the
length of the array

[](#VUID-VkDataGraphPipelineCreateInfoARM-pipelineCreationCacheControl-09871) VUID-VkDataGraphPipelineCreateInfoARM-pipelineCreationCacheControl-09871

If the [    `pipelineCreationCacheControl`](../features.html#features-pipelineCreationCacheControl) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CREATE_2_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT_KHR](../pipelines.html#VkPipelineCreateFlagBits2KHR) or
[VK_PIPELINE_CREATE_2_EARLY_RETURN_ON_FAILURE_BIT_KHR](../pipelines.html#VkPipelineCreateFlagBits2KHR)

[](#VUID-VkDataGraphPipelineCreateInfoARM-pSetLayouts-09770) VUID-VkDataGraphPipelineCreateInfoARM-pSetLayouts-09770

The descriptor set layouts in
[VkPipelineLayoutCreateInfo](../descriptorsets.html#VkPipelineLayoutCreateInfo)::`pSetLayouts` used to create
`layout` **must** not include any [VkDescriptorSetLayoutBinding](../descriptorsets.html#VkDescriptorSetLayoutBinding)
whose descriptor type is [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](../descriptorsets.html#VkDescriptorType)

[](#VUID-VkDataGraphPipelineCreateInfoARM-pipelineProtectedAccess-09772) VUID-VkDataGraphPipelineCreateInfoARM-pipelineProtectedAccess-09772

If the
[`pipelineProtectedAccess`](../features.html#features-pipelineProtectedAccess)
feature is not enabled, `flags` **must** not include
[VK_PIPELINE_CREATE_2_NO_PROTECTED_ACCESS_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR) or
[VK_PIPELINE_CREATE_2_PROTECTED_ACCESS_ONLY_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR)

[](#VUID-VkDataGraphPipelineCreateInfoARM-flags-09773) VUID-VkDataGraphPipelineCreateInfoARM-flags-09773

`flags` **must** not include both
[VK_PIPELINE_CREATE_2_NO_PROTECTED_ACCESS_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR) and
[VK_PIPELINE_CREATE_2_PROTECTED_ACCESS_ONLY_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits2KHR)

[](#VUID-VkDataGraphPipelineCreateInfoARM-pNext-09804) VUID-VkDataGraphPipelineCreateInfoARM-pNext-09804

If the `pNext` chain includes an
[VkPipelineCreationFeedbackCreateInfo](../pipelines.html#VkPipelineCreationFeedbackCreateInfo) structure, then its
`pipelineStageCreationFeedbackCount` **must** be 0

[](#VUID-VkDataGraphPipelineCreateInfoARM-pNext-09948) VUID-VkDataGraphPipelineCreateInfoARM-pNext-09948

If a [VkDataGraphProcessingEngineCreateInfoARM](#VkDataGraphProcessingEngineCreateInfoARM) structure is
included in the `pNext` chain, each member of
`pProcessingEngines` **must** be identical to an
[VkQueueFamilyDataGraphPropertiesARM](#VkQueueFamilyDataGraphPropertiesARM)::`engine` retrieved from
[vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](#vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM) with the
`physicalDevice` that was used to create `device`

[](#VUID-VkDataGraphPipelineCreateInfoARM-pNext-09949) VUID-VkDataGraphPipelineCreateInfoARM-pNext-09949

If a [VkDataGraphProcessingEngineCreateInfoARM](#VkDataGraphProcessingEngineCreateInfoARM) structure is not
included in the `pNext` chain,
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_DEFAULT_ARM](#VkPhysicalDeviceDataGraphProcessingEngineTypeARM)
**must** be set in an
[VkQueueFamilyDataGraphPropertiesARM](#VkQueueFamilyDataGraphPropertiesARM)::`engine` retrieved from
[vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](#vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM) with the
`physicalDevice` that was used to create `device`

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineCreateInfoARM-sType-sType) VUID-VkDataGraphPipelineCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_CREATE_INFO_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDataGraphPipelineCreateInfoARM-pNext-pNext) VUID-VkDataGraphPipelineCreateInfoARM-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDataGraphPipelineBuiltinModelCreateInfoQCOM](#VkDataGraphPipelineBuiltinModelCreateInfoQCOM), [VkDataGraphPipelineCompilerControlCreateInfoARM](#VkDataGraphPipelineCompilerControlCreateInfoARM), [VkDataGraphPipelineIdentifierCreateInfoARM](#VkDataGraphPipelineIdentifierCreateInfoARM), [VkDataGraphPipelineShaderModuleCreateInfoARM](#VkDataGraphPipelineShaderModuleCreateInfoARM), [VkDataGraphProcessingEngineCreateInfoARM](#VkDataGraphProcessingEngineCreateInfoARM), [VkPipelineCreationFeedbackCreateInfo](../pipelines.html#VkPipelineCreationFeedbackCreateInfo), or [VkShaderModuleCreateInfo](../shaders.html#VkShaderModuleCreateInfo)

* 
[](#VUID-VkDataGraphPipelineCreateInfoARM-sType-unique) VUID-VkDataGraphPipelineCreateInfoARM-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDataGraphPipelineCreateInfoARM-flags-parameter) VUID-VkDataGraphPipelineCreateInfoARM-flags-parameter

 `flags` **must** be a valid combination of [VkPipelineCreateFlagBits2KHR](../pipelines.html#VkPipelineCreateFlagBits2KHR) values

* 
[](#VUID-VkDataGraphPipelineCreateInfoARM-layout-parameter) VUID-VkDataGraphPipelineCreateInfoARM-layout-parameter

 `layout` **must** be a valid [VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) handle

* 
[](#VUID-VkDataGraphPipelineCreateInfoARM-pResourceInfos-parameter) VUID-VkDataGraphPipelineCreateInfoARM-pResourceInfos-parameter

 If `resourceInfoCount` is not `0`, `pResourceInfos` **must** be a valid pointer to an array of `resourceInfoCount` valid [VkDataGraphPipelineResourceInfoARM](#VkDataGraphPipelineResourceInfoARM) structures

The `VkDataGraphPipelineShaderModuleCreateInfoARM` structure is defined
as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineShaderModuleCreateInfoARM {
    VkStructureType                          sType;
    const void*                              pNext;
    VkShaderModule                           module;
    const char*                              pName;
    const VkSpecializationInfo*              pSpecializationInfo;
    uint32_t                                 constantCount;
    const VkDataGraphPipelineConstantARM*    pConstants;
} VkDataGraphPipelineShaderModuleCreateInfoARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`module` is optionally a [VkShaderModule](../shaders.html#VkShaderModule) object containing the
description of the graph.

* 
`pName` is a pointer to a null-terminated UTF-8 string specifying
the graph entry point name for this pipeline.

* 
`pSpecializationInfo` is a pointer to a [VkSpecializationInfo](../pipelines.html#VkSpecializationInfo)
structure as described in
[Specialization Constants](../pipelines.html#pipelines-specialization-constants), or
`NULL`.

* 
`constantCount` is the length of the `pConstants` array.

* 
`pConstants` is a pointer to an array of
[VkDataGraphPipelineConstantARM](#VkDataGraphPipelineConstantARM) structures.

If `module` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline’s graph is defined
by `module`.
If `module` is [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline’s graph is defined by
the chained [VkShaderModuleCreateInfo](../shaders.html#VkShaderModuleCreateInfo).

Valid Usage

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-dataGraphSpecializationConstants-09849) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-dataGraphSpecializationConstants-09849

If the [    `dataGraphSpecializationConstants`](../features.html#features-dataGraphSpecializationConstants) feature is not enabled then
`pSpecializationInfo` **must** be `NULL` and `module` **must** not
contain any `OpSpec*` instructions

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pName-09872) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pName-09872

`pName` **must** be the name of an `OpGraphEntryPointARM` in
`module`

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pNext-09873) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pNext-09873

If the `pNext` chain includes a [VkShaderModuleCreateInfo](../shaders.html#VkShaderModuleCreateInfo)
structure, then `module` **must** be [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pNext-09874) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pNext-09874

If the `pNext` chain does not include a
[VkShaderModuleCreateInfo](../shaders.html#VkShaderModuleCreateInfo) structure, then `module` **must** be a
valid [VkShaderModule](../shaders.html#VkShaderModule)

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-sType-sType) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SHADER_MODULE_CREATE_INFO_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-module-parameter) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-module-parameter

 If `module` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `module` **must** be a valid [VkShaderModule](../shaders.html#VkShaderModule) handle

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pName-parameter) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pName-parameter

 `pName` **must** be a null-terminated UTF-8 string

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pSpecializationInfo-parameter) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pSpecializationInfo-parameter

 If `pSpecializationInfo` is not `NULL`, `pSpecializationInfo` **must** be a valid pointer to a valid [VkSpecializationInfo](../pipelines.html#VkSpecializationInfo) structure

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pConstants-parameter) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pConstants-parameter

 If `constantCount` is not `0`, and `pConstants` is not `NULL`, `pConstants` **must** be a valid pointer to an array of `constantCount` valid [VkDataGraphPipelineConstantARM](#VkDataGraphPipelineConstantARM) structures

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineCreateInfoARM](#VkDataGraphPipelineCreateInfoARM)

The `VkDataGraphPipelineIdentifierCreateInfoARM` structure is defined
as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineIdentifierCreateInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           identifierSize;
    const uint8_t*     pIdentifier;
} VkDataGraphPipelineIdentifierCreateInfoARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`identifierSize` is the size in bytes of the identifier data
accessible via `pIdentifier`.

* 
`pIdentifier` is a pointer to `identifierSize` bytes of data
that describe the pipeline being created.

The `pIdentifier` **can** be retrieved from the device by calling
[vkGetDataGraphPipelinePropertiesARM](#vkGetDataGraphPipelinePropertiesARM) and searching the results for a
[VkDataGraphPipelinePropertyQueryResultARM](#VkDataGraphPipelinePropertyQueryResultARM) structure with
`property` set to [VK_DATA_GRAPH_PIPELINE_PROPERTY_IDENTIFIER_ARM](#VkDataGraphPipelinePropertyARM).

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineIdentifierCreateInfoARM-sType-sType) VUID-VkDataGraphPipelineIdentifierCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_IDENTIFIER_CREATE_INFO_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDataGraphPipelineIdentifierCreateInfoARM-pIdentifier-parameter) VUID-VkDataGraphPipelineIdentifierCreateInfoARM-pIdentifier-parameter

 `pIdentifier` **must** be a valid pointer to an array of `identifierSize` `uint8_t` values

* 
[](#VUID-VkDataGraphPipelineIdentifierCreateInfoARM-identifierSize-arraylength) VUID-VkDataGraphPipelineIdentifierCreateInfoARM-identifierSize-arraylength

 `identifierSize` **must** be greater than `0`

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineCreateInfoARM](#VkDataGraphPipelineCreateInfoARM)

The `VkDataGraphPipelineBuiltinModelCreateInfoQCOM` structure is defined
as:

// Provided by VK_QCOM_data_graph_model
typedef struct VkDataGraphPipelineBuiltinModelCreateInfoQCOM {
    VkStructureType                                        sType;
    const void*                                            pNext;
    const VkPhysicalDeviceDataGraphOperationSupportARM*    pOperation;
} VkDataGraphPipelineBuiltinModelCreateInfoQCOM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pOperation` is a [VkPhysicalDeviceDataGraphOperationSupportARM](#VkPhysicalDeviceDataGraphOperationSupportARM)
specifying the built-in operation.

The `pipelineCache` is ignored for the creation of this pipeline.

Applications **can** specify arguments to the built-in operation named in
`pOperation` with [VkDataGraphPipelineCompilerControlCreateInfoARM](#VkDataGraphPipelineCompilerControlCreateInfoARM).

Applications **should** verify that the `pVendorOptions`, `layout`, and
other state included with this pipeline creation are compatible with the
`pOperation`.
Implementations **may** fail if any state is not compatible and return
[VK_PIPELINE_COMPILE_REQUIRED](../fundamentals.html#VkResult).

|  | Built-in models are defined by the provider of the model, therefore Vulkan
| --- | --- |
does not define model compatibility.
The application should refer to the provider of the built-in model for
guidance on compatibility. |

Valid Usage

* 
[](#VUID-VkDataGraphPipelineBuiltinModelCreateInfoQCOM-pOperation-11842) VUID-VkDataGraphPipelineBuiltinModelCreateInfoQCOM-pOperation-11842

All members of `pOperation` **must** be identical to a
[VkQueueFamilyDataGraphPropertiesARM](#VkQueueFamilyDataGraphPropertiesARM)::`operation` retrieved
from [vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](#vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM) with the
`physicalDevice` that was used to create `device` and paired in
the retrieved results with a
[VkQueueFamilyDataGraphPropertiesARM](#VkQueueFamilyDataGraphPropertiesARM)::`engine` identical to an
element of
[VkDataGraphProcessingEngineCreateInfoARM](#VkDataGraphProcessingEngineCreateInfoARM)::`pProcessingEngines`
provided in the `pNext` chain

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineBuiltinModelCreateInfoQCOM-sType-sType) VUID-VkDataGraphPipelineBuiltinModelCreateInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_BUILTIN_MODEL_CREATE_INFO_QCOM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDataGraphPipelineBuiltinModelCreateInfoQCOM-pOperation-parameter) VUID-VkDataGraphPipelineBuiltinModelCreateInfoQCOM-pOperation-parameter

 `pOperation` **must** be a valid pointer to a valid [VkPhysicalDeviceDataGraphOperationSupportARM](#VkPhysicalDeviceDataGraphOperationSupportARM) structure

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineCreateInfoARM](#VkDataGraphPipelineCreateInfoARM)

The `VkDataGraphPipelineCompilerControlCreateInfoARM` structure is
defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineCompilerControlCreateInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    const char*        pVendorOptions;
} VkDataGraphPipelineCompilerControlCreateInfoARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pVendorOptions` is a null-terminated UTF-8 string specifying
implementation-specific options that affect the creation of a data graph
pipeline.

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineCompilerControlCreateInfoARM-sType-sType) VUID-VkDataGraphPipelineCompilerControlCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_COMPILER_CONTROL_CREATE_INFO_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDataGraphPipelineCompilerControlCreateInfoARM-pVendorOptions-parameter) VUID-VkDataGraphPipelineCompilerControlCreateInfoARM-pVendorOptions-parameter

 `pVendorOptions` **must** be a null-terminated UTF-8 string

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineCreateInfoARM](#VkDataGraphPipelineCreateInfoARM)

The `VkDataGraphPipelineConstantARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineConstantARM {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           id;
    const void*        pConstantData;
} VkDataGraphPipelineConstantARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is a pointer to a structure extending this structure.

* 
`id` is the unique identifier of the graph constant this structure
describes.

* 
`pConstantData` is a pointer to the data for this graph constant.

The size and layout of the data pointed to by `pConstantData` is
specified by a specific structure in the `pNext` chain for each type of
graph constant.

For graph constants of tensor type, the layout of the data is specified by a
[VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM) structure.
The data **must** be laid out according to the following members of this
structure:

* 
[VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM)::`tiling`

* 
[VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM)::`format`

* 
[VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM)::`dimensionCount`

* 
[VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM)::`pDimensions`

* 
[VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM)::`pStrides`

The presence of a
[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](#VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM)
structure in the `pNext` chain has no impact on the expected layout of
the data pointed to by `pConstantData`.

Valid Usage

* 
[](#VUID-VkDataGraphPipelineConstantARM-pNext-09775) VUID-VkDataGraphPipelineConstantARM-pNext-09775

If the `pNext` chain of this structure includes one or more
[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](#VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM)
structures then it **must** also include a [VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM)
structure

* 
[](#VUID-VkDataGraphPipelineConstantARM-pNext-09776) VUID-VkDataGraphPipelineConstantARM-pNext-09776

If the `pNext` chain of this structure includes one or more
[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](#VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM)
structures then, for each structure,
[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](#VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM)::`dimension`
**must** be less than [VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM)::`dimensionCount`

* 
[](#VUID-VkDataGraphPipelineConstantARM-pNext-09777) VUID-VkDataGraphPipelineConstantARM-pNext-09777

If the `pNext` chain of this structure includes a
[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](#VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM)
structure then, for each structure,
[VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM)::`pDimensions`[[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](#VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM)::`dimension`]
**must** be a multiple of
[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](#VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM)::`groupSize`

* 
[](#VUID-VkDataGraphPipelineConstantARM-pNext-09870) VUID-VkDataGraphPipelineConstantARM-pNext-09870

If the `pNext` chain of this structure includes multiple
[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](#VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM)
structures then no two structures **may** have their
[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](#VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM)::`dimension`
member set to the same value

* 
[](#VUID-VkDataGraphPipelineConstantARM-id-09850) VUID-VkDataGraphPipelineConstantARM-id-09850

If the `pNext` chain of this structure includes a
[VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM) structure, then its `usage` member
**must** contain [VK_TENSOR_USAGE_DATA_GRAPH_BIT_ARM](../resources.html#VkTensorUsageFlagBitsARM)

* 
[](#VUID-VkDataGraphPipelineConstantARM-pNext-09917) VUID-VkDataGraphPipelineConstantARM-pNext-09917

If the `pNext` chain of this structure includes a
[VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM) structure, then its `tiling` member
**must** be [VK_TENSOR_TILING_LINEAR_ARM](../resources.html#VkTensorTilingARM)

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineConstantARM-sType-sType) VUID-VkDataGraphPipelineConstantARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_CONSTANT_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDataGraphPipelineConstantARM-pNext-pNext) VUID-VkDataGraphPipelineConstantARM-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](#VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM) or [VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM)

* 
[](#VUID-VkDataGraphPipelineConstantARM-sType-unique) VUID-VkDataGraphPipelineConstantARM-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](#VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM)

* 
[](#VUID-VkDataGraphPipelineConstantARM-pConstantData-parameter) VUID-VkDataGraphPipelineConstantARM-pConstantData-parameter

 `pConstantData` **must** be a pointer value

The `VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM`
structure is defined as:

// Provided by VK_ARM_data_graph with VK_ARM_tensors
typedef struct VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           dimension;
    uint32_t           zeroCount;
    uint32_t           groupSize;
} VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`dimension` is the dimension of the tensor along which its data is
sparse.

* 
`zeroCount` is the number of tensor elements that **must** be zero in
every group of `groupSize` elements.

* 
`groupSize` is the number of tensor elements in a group.

|  | This extension does not provide applications with a way of knowing which
| --- | --- |
combinations of `dimension`, `zeroCount`, and `groupSize` an
implementation **can** take advantage of.
Providing sparsity information for a graph constant is always valid and
recommended, regardless of the specific combinations an implementation **can**
take advantage of.
When they **can** not take advantage of the sparsity information,
implementations will ignore it and treat the data as dense. |

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM-sType-sType) VUID-VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_CONSTANT_TENSOR_SEMI_STRUCTURED_SPARSITY_INFO_ARM](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineConstantARM](#VkDataGraphPipelineConstantARM)

The `VkDataGraphPipelineResourceInfoARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineResourceInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           descriptorSet;
    uint32_t           binding;
    uint32_t           arrayElement;
} VkDataGraphPipelineResourceInfoARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`descriptorSet` is the descriptor set number of the resource being
described.

* 
`binding` is the binding number of the resource being described.

* 
`arrayElement` is the element in the resource array if
`descriptorSet` and `binding` identifies an array of resources
or `0` otherwise.

Valid Usage

* 
[](#VUID-VkDataGraphPipelineResourceInfoARM-descriptorSet-09851) VUID-VkDataGraphPipelineResourceInfoARM-descriptorSet-09851

If the `pNext` chain of this structure includes a
[VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM) structure, then its `usage` **must**
contain [VK_TENSOR_USAGE_DATA_GRAPH_BIT_ARM](../resources.html#VkTensorUsageFlagBitsARM)

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineResourceInfoARM-sType-sType) VUID-VkDataGraphPipelineResourceInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_RESOURCE_INFO_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDataGraphPipelineResourceInfoARM-pNext-pNext) VUID-VkDataGraphPipelineResourceInfoARM-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkTensorDescriptionARM](../resources.html#VkTensorDescriptionARM)

* 
[](#VUID-VkDataGraphPipelineResourceInfoARM-sType-unique) VUID-VkDataGraphPipelineResourceInfoARM-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

Graph pipelines execute within *data graph pipeline sessions* that provide a
context for their execution as well as binding points for the memory they
need (e.g. transient storage).

Graph pipeline sessions are represented by
`VkDataGraphPipelineSessionARM` handles:

// Provided by VK_ARM_data_graph
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDataGraphPipelineSessionARM)

To create a data graph pipeline session, call

// Provided by VK_ARM_data_graph
VkResult vkCreateDataGraphPipelineSessionARM(
    VkDevice                                    device,
    const VkDataGraphPipelineSessionCreateInfoARM* pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDataGraphPipelineSessionARM*              pSession);

* 
`device` is the logical device that creates the data graph pipeline
session.

* 
`pCreateInfo` is a pointer to a
[VkDataGraphPipelineSessionCreateInfoARM](#VkDataGraphPipelineSessionCreateInfoARM) structure.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../memory.html#memory-allocation) chapter.

* 
`pSession` is a pointer to a [VkDataGraphPipelineSessionARM](#VkDataGraphPipelineSessionARM)
handle in which the resulting data graph pipeline session object is
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDataGraphPipelineSessionARM-device-parameter) VUID-vkCreateDataGraphPipelineSessionARM-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateDataGraphPipelineSessionARM-pCreateInfo-parameter) VUID-vkCreateDataGraphPipelineSessionARM-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDataGraphPipelineSessionCreateInfoARM](#VkDataGraphPipelineSessionCreateInfoARM) structure

* 
[](#VUID-vkCreateDataGraphPipelineSessionARM-pAllocator-parameter) VUID-vkCreateDataGraphPipelineSessionARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateDataGraphPipelineSessionARM-pSession-parameter) VUID-vkCreateDataGraphPipelineSessionARM-pSession-parameter

 `pSession` **must** be a valid pointer to a [VkDataGraphPipelineSessionARM](#VkDataGraphPipelineSessionARM) handle

* 
[](#VUID-vkCreateDataGraphPipelineSessionARM-device-queuecount) VUID-vkCreateDataGraphPipelineSessionARM-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkDataGraphPipelineSessionCreateInfoARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineSessionCreateInfoARM {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkDataGraphPipelineSessionCreateFlagsARM    flags;
    VkPipeline                                  dataGraphPipeline;
} VkDataGraphPipelineSessionCreateInfoARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of
[VkDataGraphPipelineSessionCreateFlagBitsARM](#VkDataGraphPipelineSessionCreateFlagBitsARM) describing additional
parameters of the session.

* 
`dataGraphPipeline` is the [VkPipeline](../pipelines.html#VkPipeline) handle of the data graph
pipeline for which a session is being created.

Valid Usage

* 
[](#VUID-VkDataGraphPipelineSessionCreateInfoARM-dataGraphPipeline-09781) VUID-VkDataGraphPipelineSessionCreateInfoARM-dataGraphPipeline-09781

`dataGraphPipeline` **must** have been obtained via a call to
[vkCreateDataGraphPipelinesARM](#vkCreateDataGraphPipelinesARM)

* 
[](#VUID-VkDataGraphPipelineSessionCreateInfoARM-protectedMemory-09782) VUID-VkDataGraphPipelineSessionCreateInfoARM-protectedMemory-09782

If the [`protectedMemory`](../features.html#features-protectedMemory) feature is not
enabled, `flags` **must** not contain
[VK_DATA_GRAPH_PIPELINE_SESSION_CREATE_PROTECTED_BIT_ARM](#VkDataGraphPipelineSessionCreateFlagBitsARM)

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineSessionCreateInfoARM-sType-sType) VUID-VkDataGraphPipelineSessionCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_CREATE_INFO_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDataGraphPipelineSessionCreateInfoARM-pNext-pNext) VUID-VkDataGraphPipelineSessionCreateInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDataGraphPipelineSessionCreateInfoARM-flags-parameter) VUID-VkDataGraphPipelineSessionCreateInfoARM-flags-parameter

 `flags` **must** be a valid combination of [VkDataGraphPipelineSessionCreateFlagBitsARM](#VkDataGraphPipelineSessionCreateFlagBitsARM) values

* 
[](#VUID-VkDataGraphPipelineSessionCreateInfoARM-dataGraphPipeline-parameter) VUID-VkDataGraphPipelineSessionCreateInfoARM-dataGraphPipeline-parameter

 `dataGraphPipeline` **must** be a valid [VkPipeline](../pipelines.html#VkPipeline) handle

Bits which **can** be set in
[VkDataGraphPipelineSessionCreateInfoARM](#VkDataGraphPipelineSessionCreateInfoARM)::`flags`, specifying
additional parameters of a data graph pipeline session, are:

// Provided by VK_ARM_data_graph
// Flag bits for VkDataGraphPipelineSessionCreateFlagBitsARM
typedef VkFlags64 VkDataGraphPipelineSessionCreateFlagBitsARM;
static const VkDataGraphPipelineSessionCreateFlagBitsARM VK_DATA_GRAPH_PIPELINE_SESSION_CREATE_PROTECTED_BIT_ARM = 0x00000001ULL;

* 
[VK_DATA_GRAPH_PIPELINE_SESSION_CREATE_PROTECTED_BIT_ARM](#VkDataGraphPipelineSessionCreateFlagBitsARM) specifies
that the data graph pipeline session is backed by protected memory.

// Provided by VK_ARM_data_graph
typedef VkFlags64 VkDataGraphPipelineSessionCreateFlagsARM;

`VkDataGraphPipelineSessionCreateFlagsARM` is a bitmask type for setting
a mask of zero or more [VkDataGraphPipelineSessionCreateFlagBitsARM](#VkDataGraphPipelineSessionCreateFlagBitsARM).

To determine the bind point requirements for a data graph pipeline session,
call:

// Provided by VK_ARM_data_graph
VkResult vkGetDataGraphPipelineSessionBindPointRequirementsARM(
    VkDevice                                    device,
    const VkDataGraphPipelineSessionBindPointRequirementsInfoARM* pInfo,
    uint32_t*                                   pBindPointRequirementCount,
    VkDataGraphPipelineSessionBindPointRequirementARM* pBindPointRequirements);

* 
`device` is the logical device that owns the data graph pipeline
session.

* 
`pInfo` is a pointer to a
[VkDataGraphPipelineSessionBindPointRequirementsInfoARM](#VkDataGraphPipelineSessionBindPointRequirementsInfoARM) structure
containing parameters for the bind point requirements query.

* 
`pBindPointRequirementCount` is a pointer to an integer related to
the number of bind point available or queried, as described below.

* 
`pBindPointRequirements` is either `NULL` or a pointer to an array
of [VkDataGraphPipelineSessionBindPointRequirementARM](#VkDataGraphPipelineSessionBindPointRequirementARM) structures.

If `pBindPointRequirements` is `NULL`, then the number of bind points
associated with the data graph pipeline session is returned in
`pBindPointRequirementCount`.
Otherwise, `pBindPointRequirementCount` **must** point to a variable set by
the user to the number of elements in the `pBindPointRequirements`
array, and on return the variable is overwritten with the number of
structures actually written to `pBindPointRequirements`.
If `pBindPointRequirementCount` is less than the number of bind points
associated with the data graph pipeline session, at most
`pBindPointRequirementCount` structures will be written, and
[VK_INCOMPLETE](../fundamentals.html#VkResult) will be returned instead of [VK_SUCCESS](../fundamentals.html#VkResult), to
indicate that not all the required bind points were returned.

Valid Usage

* 
[](#VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-session-09783) VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-session-09783

The `session` member of `pInfo` **must** have been created with
`device`

Valid Usage (Implicit)

* 
[](#VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-device-parameter) VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-pInfo-parameter) VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDataGraphPipelineSessionBindPointRequirementsInfoARM](#VkDataGraphPipelineSessionBindPointRequirementsInfoARM) structure

* 
[](#VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-pBindPointRequirementCount-parameter) VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-pBindPointRequirementCount-parameter

 `pBindPointRequirementCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-pBindPointRequirements-parameter) VUID-vkGetDataGraphPipelineSessionBindPointRequirementsARM-pBindPointRequirements-parameter

 If the value referenced by `pBindPointRequirementCount` is not `0`, and `pBindPointRequirements` is not `NULL`, `pBindPointRequirements` **must** be a valid pointer to an array of `pBindPointRequirementCount` [VkDataGraphPipelineSessionBindPointRequirementARM](#VkDataGraphPipelineSessionBindPointRequirementARM) structures

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineSessionBindPointRequirementsInfoARM {
    VkStructureType                  sType;
    const void*                      pNext;
    VkDataGraphPipelineSessionARM    session;
} VkDataGraphPipelineSessionBindPointRequirementsInfoARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`session` is a [VkDataGraphPipelineSessionARM](#VkDataGraphPipelineSessionARM) specifying the
data graph pipeline session whose bind point requirements are being
queried.

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineSessionBindPointRequirementsInfoARM-sType-sType) VUID-VkDataGraphPipelineSessionBindPointRequirementsInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_REQUIREMENTS_INFO_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDataGraphPipelineSessionBindPointRequirementsInfoARM-pNext-pNext) VUID-VkDataGraphPipelineSessionBindPointRequirementsInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDataGraphPipelineSessionBindPointRequirementsInfoARM-session-parameter) VUID-VkDataGraphPipelineSessionBindPointRequirementsInfoARM-session-parameter

 `session` **must** be a valid [VkDataGraphPipelineSessionARM](#VkDataGraphPipelineSessionARM) handle

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineSessionBindPointRequirementARM {
    VkStructureType                               sType;
    void*                                         pNext;
    VkDataGraphPipelineSessionBindPointARM        bindPoint;
    VkDataGraphPipelineSessionBindPointTypeARM    bindPointType;
    uint32_t                                      numObjects;
} VkDataGraphPipelineSessionBindPointRequirementARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`bindPoint` is a [VkDataGraphPipelineSessionBindPointARM](#VkDataGraphPipelineSessionBindPointARM)
specifying the data graph pipeline session bind point being required.

* 
`bindPointType` is a
[VkDataGraphPipelineSessionBindPointTypeARM](#VkDataGraphPipelineSessionBindPointTypeARM) specifying the type of
object required for `bindPoint`.

* 
`numObjects` is the number of objects required for `bindPoint`.

Implementations **must** always return 1 for `numObjects` if
`bindPoint` is one of the following bind points:

* 
[VK_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_TRANSIENT_ARM](#VkDataGraphPipelineSessionBindPointARM)

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineSessionBindPointRequirementARM-sType-sType) VUID-VkDataGraphPipelineSessionBindPointRequirementARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_REQUIREMENT_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDataGraphPipelineSessionBindPointRequirementARM-pNext-pNext) VUID-VkDataGraphPipelineSessionBindPointRequirementARM-pNext-pNext

 `pNext` **must** be `NULL`

Possible values of [VkDataGraphPipelineSessionBindPointARM](#VkDataGraphPipelineSessionBindPointARM), specifying
the bind point of a data graph pipeline session, are:

// Provided by VK_ARM_data_graph
typedef enum VkDataGraphPipelineSessionBindPointARM {
    VK_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_TRANSIENT_ARM = 0,
} VkDataGraphPipelineSessionBindPointARM;

* 
[VK_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_TRANSIENT_ARM](#VkDataGraphPipelineSessionBindPointARM)
corresponds to the transient data produced and consumed during one
dispatch of a data graph pipeline in a data graph pipeline session.
This transient data is never reused by subsequent dispatches and can
safely be clobbered once a [vkCmdDispatchDataGraphARM](#vkCmdDispatchDataGraphARM) command
completes execution.

Possible values of [VkDataGraphPipelineSessionBindPointTypeARM](#VkDataGraphPipelineSessionBindPointTypeARM),
specifying the type of a bind point of a data graph pipeline session, are:

// Provided by VK_ARM_data_graph
typedef enum VkDataGraphPipelineSessionBindPointTypeARM {
    VK_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_TYPE_MEMORY_ARM = 0,
} VkDataGraphPipelineSessionBindPointTypeARM;

* 
[VK_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_TYPE_MEMORY_ARM](#VkDataGraphPipelineSessionBindPointTypeARM)
corresponds to a memory allocation.

To determine the memory requirements for a data graph pipeline session,
call:

// Provided by VK_ARM_data_graph
void vkGetDataGraphPipelineSessionMemoryRequirementsARM(
    VkDevice                                    device,
    const VkDataGraphPipelineSessionMemoryRequirementsInfoARM* pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device that owns the data graph pipeline
session.

* 
`pInfo` is a pointer to a
[VkDataGraphPipelineSessionMemoryRequirementsInfoARM](#VkDataGraphPipelineSessionMemoryRequirementsInfoARM) structure
containing parameters for the memory requirements query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](../resources.html#VkMemoryRequirements2)
structure in which the memory requirements of the data graph pipeline
session object are returned.

Valid Usage

* 
[](#VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-session-09950) VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-session-09950

The `session` member of `pInfo` **must** have been created with
`device`

* 
[](#VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-bindPoint-09784) VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-bindPoint-09784

The `bindPoint` member of `pInfo` **must** have been returned as
part of a [VkDataGraphPipelineSessionBindPointRequirementARM](#VkDataGraphPipelineSessionBindPointRequirementARM) whose
`bindPointType` member is
[VK_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_TYPE_MEMORY_ARM](#VkDataGraphPipelineSessionBindPointTypeARM) by a
prior call to
[vkGetDataGraphPipelineSessionBindPointRequirementsARM](#vkGetDataGraphPipelineSessionBindPointRequirementsARM) for the
`session` member of `pInfo`

Valid Usage (Implicit)

* 
[](#VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-device-parameter) VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-pInfo-parameter) VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDataGraphPipelineSessionMemoryRequirementsInfoARM](#VkDataGraphPipelineSessionMemoryRequirementsInfoARM) structure

* 
[](#VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-pMemoryRequirements-parameter) VUID-vkGetDataGraphPipelineSessionMemoryRequirementsARM-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](../resources.html#VkMemoryRequirements2) structure

The `VkDataGraphPipelineSessionMemoryRequirementsInfoARM` structure is
defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineSessionMemoryRequirementsInfoARM {
    VkStructureType                           sType;
    const void*                               pNext;
    VkDataGraphPipelineSessionARM             session;
    VkDataGraphPipelineSessionBindPointARM    bindPoint;
    uint32_t                                  objectIndex;
} VkDataGraphPipelineSessionMemoryRequirementsInfoARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`session` is the data graph pipeline session to query.

* 
`bindPoint` is the bind point of a data graph pipeline session for
which memory requirements are being queried.

* 
`objectIndex` is the index of the object whose memory requirements
are being queried.

Valid Usage

* 
[](#VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-objectIndex-09855) VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-objectIndex-09855

`objectIndex` **must** be less than the number of objects returned by
[vkGetDataGraphPipelineSessionBindPointRequirementsARM](#vkGetDataGraphPipelineSessionBindPointRequirementsARM) via
[VkDataGraphPipelineSessionBindPointRequirementARM](#VkDataGraphPipelineSessionBindPointRequirementARM)::`numObjects`
with
[VkDataGraphPipelineSessionMemoryRequirementsInfoARM](#VkDataGraphPipelineSessionMemoryRequirementsInfoARM)::`bindPoint`
equal to `bindPoint`

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-sType-sType) VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_MEMORY_REQUIREMENTS_INFO_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-pNext-pNext) VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-session-parameter) VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-session-parameter

 `session` **must** be a valid [VkDataGraphPipelineSessionARM](#VkDataGraphPipelineSessionARM) handle

* 
[](#VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-bindPoint-parameter) VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-bindPoint-parameter

 `bindPoint` **must** be a valid [VkDataGraphPipelineSessionBindPointARM](#VkDataGraphPipelineSessionBindPointARM) value

To attach memory to a data graph pipeline session object, call:

// Provided by VK_ARM_data_graph
VkResult vkBindDataGraphPipelineSessionMemoryARM(
    VkDevice                                    device,
    uint32_t                                    bindInfoCount,
    const VkBindDataGraphPipelineSessionMemoryInfoARM* pBindInfos);

* 
`device` is the logical device that owns the data graph pipeline
session and memory.

* 
`bindInfoCount` is the length of the `pBindInfos` array.

* 
`pBindInfos` is a pointer to an array of
[VkBindDataGraphPipelineSessionMemoryInfoARM](#VkBindDataGraphPipelineSessionMemoryInfoARM) structures describing
graph pipeline sessions and memory to bind.

Valid Usage (Implicit)

* 
[](#VUID-vkBindDataGraphPipelineSessionMemoryARM-device-parameter) VUID-vkBindDataGraphPipelineSessionMemoryARM-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkBindDataGraphPipelineSessionMemoryARM-pBindInfos-parameter) VUID-vkBindDataGraphPipelineSessionMemoryARM-pBindInfos-parameter

 `pBindInfos` **must** be a valid pointer to an array of `bindInfoCount` valid [VkBindDataGraphPipelineSessionMemoryInfoARM](#VkBindDataGraphPipelineSessionMemoryInfoARM) structures

* 
[](#VUID-vkBindDataGraphPipelineSessionMemoryARM-bindInfoCount-arraylength) VUID-vkBindDataGraphPipelineSessionMemoryARM-bindInfoCount-arraylength

 `bindInfoCount` **must** be greater than `0`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkBindDataGraphPipelineSessionMemoryInfoARM` structure is defined
as:

// Provided by VK_ARM_data_graph
typedef struct VkBindDataGraphPipelineSessionMemoryInfoARM {
    VkStructureType                           sType;
    const void*                               pNext;
    VkDataGraphPipelineSessionARM             session;
    VkDataGraphPipelineSessionBindPointARM    bindPoint;
    uint32_t                                  objectIndex;
    VkDeviceMemory                            memory;
    VkDeviceSize                              memoryOffset;
} VkBindDataGraphPipelineSessionMemoryInfoARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`session` is the data graph pipeline session to be attached to
memory.

* 
`bindPoint` is the data graph pipeline session bind point to which
`memory` is to be attached.

* 
`objectIndex` is the index of the object for `bindPoint` at
which `memory` is to be attached.

* 
`memory` is a [VkDeviceMemory](../memory.html#VkDeviceMemory) object describing the device
memory to attach.

* 
`memoryOffset` is the start offset of the resion of `memory`
which is to be bound to the data graph pipeline session.

Valid Usage

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-session-09785) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-session-09785

`session` **must** not have been bound to a memory object for
`bindPoint`

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-bindPoint-09786) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-bindPoint-09786

`bindPoint` **must** have been returned as part of a
[VkDataGraphPipelineSessionBindPointRequirementARM](#VkDataGraphPipelineSessionBindPointRequirementARM) whose
`bindPointType` member is
[VK_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_TYPE_MEMORY_ARM](#VkDataGraphPipelineSessionBindPointTypeARM) by a
prior call to [vkGetDataGraphPipelineSessionMemoryRequirementsARM](#vkGetDataGraphPipelineSessionMemoryRequirementsARM)
for `session`

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-memoryOffset-09787) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-memoryOffset-09787

`memoryOffset` **must** be less than the size of `memory`

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-memory-09788) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-memory-09788

`memory` must have been allocated using one of the memory types
allowed in the `memoryTypeBits` member of the
[VkMemoryRequirements](../resources.html#VkMemoryRequirements) structure returned from a call to
[vkGetDataGraphPipelineSessionMemoryRequirementsARM](#vkGetDataGraphPipelineSessionMemoryRequirementsARM) with
`session`

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-memoryOffset-09789) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-memoryOffset-09789

`memoryOffset` **must** be an integer multiple of the `alignment`
member of the [VkMemoryRequirements](../resources.html#VkMemoryRequirements) structure returned from a call
to [vkGetDataGraphPipelineSessionMemoryRequirementsARM](#vkGetDataGraphPipelineSessionMemoryRequirementsARM) with
`session`

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-size-09790) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-size-09790

The `size` member of the [VkMemoryRequirements](../resources.html#VkMemoryRequirements) structure
returned from a call to
[vkGetDataGraphPipelineSessionMemoryRequirementsARM](#vkGetDataGraphPipelineSessionMemoryRequirementsARM) with
`session` **must** be less than or equal to the size of `memory`
minus `memoryOffset`

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-session-09791) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-session-09791

If `session` was created with the
[VK_DATA_GRAPH_PIPELINE_SESSION_CREATE_PROTECTED_BIT_ARM](#VkDataGraphPipelineSessionCreateFlagBitsARM) bit set,
the session **must** be bound to a memory object allocated with a memory
type that reports [VK_MEMORY_PROPERTY_PROTECTED_BIT](../memory.html#VkMemoryPropertyFlagBits)

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-session-09792) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-session-09792

If `session` was created with the
[VK_DATA_GRAPH_PIPELINE_SESSION_CREATE_PROTECTED_BIT_ARM](#VkDataGraphPipelineSessionCreateFlagBitsARM) bit not
set, the session **must** not be bound to a memory object allocated with a
memory type that reports [VK_MEMORY_PROPERTY_PROTECTED_BIT](../memory.html#VkMemoryPropertyFlagBits)

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-objectIndex-09805) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-objectIndex-09805

`objectIndex` **must** be less than the value of `numObjects`
returned by [vkGetDataGraphPipelineSessionBindPointRequirementsARM](#vkGetDataGraphPipelineSessionBindPointRequirementsARM)
for `bindPoint`

Valid Usage (Implicit)

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-sType-sType) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_DATA_GRAPH_PIPELINE_SESSION_MEMORY_INFO_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-pNext-pNext) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-session-parameter) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-session-parameter

 `session` **must** be a valid [VkDataGraphPipelineSessionARM](#VkDataGraphPipelineSessionARM) handle

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-bindPoint-parameter) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-bindPoint-parameter

 `bindPoint` **must** be a valid [VkDataGraphPipelineSessionBindPointARM](#VkDataGraphPipelineSessionBindPointARM) value

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-memory-parameter) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](../memory.html#VkDeviceMemory) handle

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-commonparent) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-commonparent

 Both of `memory`, and `session` **must** have been created, allocated, or retrieved from the same [VkDevice](../devsandqueues.html#VkDevice)

To destroy a data graph pipeline session, call:

// Provided by VK_ARM_data_graph
void vkDestroyDataGraphPipelineSessionARM(
    VkDevice                                    device,
    VkDataGraphPipelineSessionARM               session,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the data graph pipeline
session.

* 
`session` is the handle of the data graph pipeline session to
destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyDataGraphPipelineSessionARM-session-09793) VUID-vkDestroyDataGraphPipelineSessionARM-session-09793

All submitted commands that refer to `session` **must** have completed
execution

* 
[](#VUID-vkDestroyDataGraphPipelineSessionARM-session-09794) VUID-vkDestroyDataGraphPipelineSessionARM-session-09794

If `VkAllocationCallbacks` were provided when `session` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyDataGraphPipelineSessionARM-session-09795) VUID-vkDestroyDataGraphPipelineSessionARM-session-09795

If no `VkAllocationCallbacks` were provided when `session` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyDataGraphPipelineSessionARM-device-parameter) VUID-vkDestroyDataGraphPipelineSessionARM-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyDataGraphPipelineSessionARM-session-parameter) VUID-vkDestroyDataGraphPipelineSessionARM-session-parameter

 `session` **must** be a valid [VkDataGraphPipelineSessionARM](#VkDataGraphPipelineSessionARM) handle

* 
[](#VUID-vkDestroyDataGraphPipelineSessionARM-pAllocator-parameter) VUID-vkDestroyDataGraphPipelineSessionARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyDataGraphPipelineSessionARM-session-parent) VUID-vkDestroyDataGraphPipelineSessionARM-session-parent

 `session` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `session` **must** be externally synchronized

To record a data graph pipeline dispatch, call:

// Provided by VK_ARM_data_graph
void vkCmdDispatchDataGraphARM(
    VkCommandBuffer                             commandBuffer,
    VkDataGraphPipelineSessionARM               session,
    const VkDataGraphPipelineDispatchInfoARM*   pInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`session` is the [VkDataGraphPipelineSessionARM](#VkDataGraphPipelineSessionARM) that data graph
pipeline being dispatched will use.

* 
`pInfo` is `NULL` or a pointer to a
[VkDataGraphPipelineDispatchInfoARM](#VkDataGraphPipelineDispatchInfoARM) structure.

Valid Usage

* 
[](#VUID-vkCmdDispatchDataGraphARM-session-09796) VUID-vkCmdDispatchDataGraphARM-session-09796

For each of the session bind point requirements returned by
[vkGetDataGraphPipelineSessionBindPointRequirementsARM](#vkGetDataGraphPipelineSessionBindPointRequirementsARM) for
`session`,
[VkDataGraphPipelineSessionBindPointRequirementARM](#VkDataGraphPipelineSessionBindPointRequirementARM)::`numObjects`
objects **must** have been bound to `session`

* 
[](#VUID-vkCmdDispatchDataGraphARM-dataGraphPipeline-09951) VUID-vkCmdDispatchDataGraphARM-dataGraphPipeline-09951

The [VkPipeline](../pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command **must** be identical to the `dataGraphPipeline` used to create
`session`

* 
[](#VUID-vkCmdDispatchDataGraphARM-None-09797) VUID-vkCmdDispatchDataGraphARM-None-09797

For each set *n* that is statically used by a bound data graph pipeline,
a descriptor set **must** have been bound to *n* at the same pipeline bind
point, with a [VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) that is compatible for set *n*,
with the [VkPipelineLayout](../descriptorsets.html#VkPipelineLayout) used to create the current
[VkPipeline](../pipelines.html#VkPipeline), as described in [Pipeline Layout Compatibility](../descriptorsets.html#descriptors-compatibility)

* 
[](#VUID-vkCmdDispatchDataGraphARM-None-09935) VUID-vkCmdDispatchDataGraphARM-None-09935

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](../descriptorsets.html#vkCmdBindDescriptorSets), **must** be valid as described by
[descriptor validity](../descriptorsets.html#descriptor-validity) if they are statically used
by
the [VkPipeline](../pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command and the bound [VkPipeline](../pipelines.html#VkPipeline) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchDataGraphARM-None-09936) VUID-vkCmdDispatchDataGraphARM-None-09936

If the descriptors used by the [VkPipeline](../pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](../descriptorsets.html#vkCmdBindDescriptorSets), the bound
[VkPipeline](../pipelines.html#VkPipeline) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchDataGraphARM-None-09937) VUID-vkCmdDispatchDataGraphARM-None-09937

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](../descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by the [VkPipeline](../pipelines.html#VkPipeline) bound to the pipeline bind
point used by this command and the bound [VkPipeline](../pipelines.html#VkPipeline) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchDataGraphARM-None-09938) VUID-vkCmdDispatchDataGraphARM-None-09938

If the descriptors used by the [VkPipeline](../pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](../descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT),
the bound [VkPipeline](../pipelines.html#VkPipeline) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchDataGraphARM-None-09939) VUID-vkCmdDispatchDataGraphARM-None-09939

If a descriptor is dynamically used with a [VkPipeline](../pipelines.html#VkPipeline) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](../pipelines.html#VkPipelineCreateFlagBits), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdDispatchDataGraphARM-None-09799) VUID-vkCmdDispatchDataGraphARM-None-09799

A valid data graph pipeline **must** be bound to the
[VK_PIPELINE_BIND_POINT_DATA_GRAPH_ARM](../pipelines.html#VkPipelineBindPoint) pipeline bind point used by
this command

* 
[](#VUID-vkCmdDispatchDataGraphARM-pDescription-09930) VUID-vkCmdDispatchDataGraphARM-pDescription-09930

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](../descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](../resources.html#VkTensorARM) object
**must** have been created with a
[VkTensorCreateInfoARM](../resources.html#VkTensorCreateInfoARM)::`pDescription` whose `usage` member
contained [VK_TENSOR_USAGE_DATA_GRAPH_BIT_ARM](../resources.html#VkTensorUsageFlagBitsARM)

* 
[](#VUID-vkCmdDispatchDataGraphARM-pipeline-09940) VUID-vkCmdDispatchDataGraphARM-pipeline-09940

If the [VkPipeline](../pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command was created with a
[VkDataGraphProcessingEngineCreateInfoARM](#VkDataGraphProcessingEngineCreateInfoARM) structure in the
`pNext` chain of [VkDataGraphPipelineCreateInfoARM](#VkDataGraphPipelineCreateInfoARM) that
included a foreign data graph processing engine in its
`pProcessingEngines` member, then all
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](../descriptorsets.html#VkDescriptorType) descriptors accessed as a result of
this command **must** be [VkTensorARM](../resources.html#VkTensorARM) objects that have been bound to
memory allocated with
[VkExportMemoryAllocateInfo](../memory.html#VkExportMemoryAllocateInfo)::`handleTypes` with set bits that
are a subset of the bits in
[VkQueueFamilyDataGraphProcessingEnginePropertiesARM](#VkQueueFamilyDataGraphProcessingEnginePropertiesARM)::`foreignMemoryHandleTypes`
structure queried via
[vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM](#vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM)
with a `queueFamilyIndex` matching the one the command pool used to
create `commandBuffer` was created for and an identical
`engineType`, for all the foreign data graph processing engines that
were part of the [VkDataGraphProcessingEngineCreateInfoARM](#VkDataGraphProcessingEngineCreateInfoARM) used to
create the [VkPipeline](../pipelines.html#VkPipeline)

* 
[](#VUID-vkCmdDispatchDataGraphARM-pNext-09952) VUID-vkCmdDispatchDataGraphARM-pNext-09952

If the [VkPipeline](../pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command was created with a
[VkDataGraphProcessingEngineCreateInfoARM](#VkDataGraphProcessingEngineCreateInfoARM) structure in the
`pNext` chain of [VkDataGraphPipelineCreateInfoARM](#VkDataGraphPipelineCreateInfoARM) that
included a foreign data graph processing engine in its
`pProcessingEngines` member, then all `session` bound memory
**must** have been allocated with
[VkExportMemoryAllocateInfo](../memory.html#VkExportMemoryAllocateInfo)::`handleTypes` with set bits that
are a subset of the bits in
[VkQueueFamilyDataGraphProcessingEnginePropertiesARM](#VkQueueFamilyDataGraphProcessingEnginePropertiesARM)::`foreignMemoryHandleTypes`
structure queried via
[vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM](#vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM)
with a `queueFamilyIndex` matching the one the command pool used to
create `commandBuffer` was created for and an identical
`engineType`, for all the foreign data graph processing engines that
were part of the [VkDataGraphProcessingEngineCreateInfoARM](#VkDataGraphProcessingEngineCreateInfoARM) used to
create the [VkPipeline](../pipelines.html#VkPipeline)

* 
[](#VUID-vkCmdDispatchDataGraphARM-commandBuffer-09800) VUID-vkCmdDispatchDataGraphARM-commandBuffer-09800

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by bound data graph pipelines **must** not be a
protected resource

* 
[](#VUID-vkCmdDispatchDataGraphARM-commandBuffer-09801) VUID-vkCmdDispatchDataGraphARM-commandBuffer-09801

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../devsandqueues.html#limits-protectedNoFault) is not supported,
any resource written to by the `VkPipeline` object bound to the bind
point used by this command **must** not be an unprotected resource

* 
[](#VUID-vkCmdDispatchDataGraphARM-commandBuffer-09941) VUID-vkCmdDispatchDataGraphARM-commandBuffer-09941

All the operations used by the bound data graph pipeline **must** be
supported on the queue family for which the command pool out of which
`commandBuffer` was allocated, as reported by
[vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](#vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDispatchDataGraphARM-commandBuffer-parameter) VUID-vkCmdDispatchDataGraphARM-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](../cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdDispatchDataGraphARM-session-parameter) VUID-vkCmdDispatchDataGraphARM-session-parameter

 `session` **must** be a valid [VkDataGraphPipelineSessionARM](#VkDataGraphPipelineSessionARM) handle

* 
[](#VUID-vkCmdDispatchDataGraphARM-pInfo-parameter) VUID-vkCmdDispatchDataGraphARM-pInfo-parameter

 If `pInfo` is not `NULL`, `pInfo` **must** be a valid pointer to a valid [VkDataGraphPipelineDispatchInfoARM](#VkDataGraphPipelineDispatchInfoARM) structure

* 
[](#VUID-vkCmdDispatchDataGraphARM-commandBuffer-recording) VUID-vkCmdDispatchDataGraphARM-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDispatchDataGraphARM-commandBuffer-cmdpool) VUID-vkCmdDispatchDataGraphARM-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_DATA_GRAPH_BIT_ARM](../devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdDispatchDataGraphARM-renderpass) VUID-vkCmdDispatchDataGraphARM-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdDispatchDataGraphARM-suspended) VUID-vkCmdDispatchDataGraphARM-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDispatchDataGraphARM-videocoding) VUID-vkCmdDispatchDataGraphARM-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdDispatchDataGraphARM-commonparent) VUID-vkCmdDispatchDataGraphARM-commonparent

 Both of `commandBuffer`, and `session` **must** have been created, allocated, or retrieved from the same [VkDevice](../devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../devsandqueues.html#VkQueueFlagBits) | [Command Type](../fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_DATA_GRAPH_BIT_ARM | Action |

Conditional Rendering

vkCmdDispatchDataGraphARM is affected by [conditional rendering](../drawing.html#drawing-conditional-rendering)

The [VkDataGraphPipelineDispatchInfoARM](#VkDataGraphPipelineDispatchInfoARM) structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineDispatchInfoARM {
    VkStructureType                        sType;
    void*                                  pNext;
    VkDataGraphPipelineDispatchFlagsARM    flags;
} VkDataGraphPipelineDispatchInfoARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkDataGraphPipelineDispatchFlagBitsARM](#VkDataGraphPipelineDispatchFlagBitsARM)
describing additional parameters of the dispatch.

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineDispatchInfoARM-sType-sType) VUID-VkDataGraphPipelineDispatchInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_DISPATCH_INFO_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDataGraphPipelineDispatchInfoARM-pNext-pNext) VUID-VkDataGraphPipelineDispatchInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDataGraphPipelineDispatchInfoARM-flags-zerobitmask) VUID-VkDataGraphPipelineDispatchInfoARM-flags-zerobitmask

 `flags` **must** be `0`

Bits which **can** be set in
[VkDataGraphPipelineDispatchInfoARM](#VkDataGraphPipelineDispatchInfoARM)::`flags`, specifying additional
parameters of a data graph pipeline dispatch, are:

// Provided by VK_ARM_data_graph
// Flag bits for VkDataGraphPipelineDispatchFlagBitsARM
typedef VkFlags64 VkDataGraphPipelineDispatchFlagBitsARM;

// Provided by VK_ARM_data_graph
typedef VkFlags64 VkDataGraphPipelineDispatchFlagsARM;

`VkDataGraphPipelineDispatchFlagsARM` is a bitmask type for setting a
mask of zero or more [VkDataGraphPipelineDispatchFlagBitsARM](#VkDataGraphPipelineDispatchFlagBitsARM).

To query the properties of a data graph pipeline that can be obtained, call:

// Provided by VK_ARM_data_graph
VkResult vkGetDataGraphPipelineAvailablePropertiesARM(
    VkDevice                                    device,
    const VkDataGraphPipelineInfoARM*           pPipelineInfo,
    uint32_t*                                   pPropertiesCount,
    VkDataGraphPipelinePropertyARM*             pProperties);

* 
`device` is the logical device that created the data graph pipeline.

* 
`pPipelineInfo` is a [VkDataGraphPipelineInfoARM](#VkDataGraphPipelineInfoARM) that describes
the [VkPipeline](../pipelines.html#VkPipeline) being queried.

* 
`pPropertiesCount` is a pointer to an integer related to the number
of properties available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkDataGraphPipelinePropertyARM](#VkDataGraphPipelinePropertyARM) enums.

If `pProperties` is `NULL`, then the number of properties associated
with the data graph pipeline is returned in `pPropertiesCount`.
Otherwise, `pPropertiesCount` **must** point to a variable set by the user
to the number of elements in the `pProperties` array, and on return the
variable is overwritten with the number of enums actually written to
`pProperties`.
If `pPropertiesCount` is less than the number of properties associated
with the data graph pipeline, at most `pPropertiesCount` structures will
be written, and [VK_INCOMPLETE](../fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](../fundamentals.html#VkResult), to indicate that not all the available properties were
returned.

Valid Usage

* 
[](#VUID-vkGetDataGraphPipelineAvailablePropertiesARM-dataGraphPipeline-09888) VUID-vkGetDataGraphPipelineAvailablePropertiesARM-dataGraphPipeline-09888

The `dataGraphPipeline` member of `pPipelineInfo` **must** have
been created with `device`

Valid Usage (Implicit)

* 
[](#VUID-vkGetDataGraphPipelineAvailablePropertiesARM-device-parameter) VUID-vkGetDataGraphPipelineAvailablePropertiesARM-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDataGraphPipelineAvailablePropertiesARM-pPipelineInfo-parameter) VUID-vkGetDataGraphPipelineAvailablePropertiesARM-pPipelineInfo-parameter

 `pPipelineInfo` **must** be a valid pointer to a valid [VkDataGraphPipelineInfoARM](#VkDataGraphPipelineInfoARM) structure

* 
[](#VUID-vkGetDataGraphPipelineAvailablePropertiesARM-pPropertiesCount-parameter) VUID-vkGetDataGraphPipelineAvailablePropertiesARM-pPropertiesCount-parameter

 `pPropertiesCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetDataGraphPipelineAvailablePropertiesARM-pProperties-parameter) VUID-vkGetDataGraphPipelineAvailablePropertiesARM-pProperties-parameter

 If the value referenced by `pPropertiesCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertiesCount` [VkDataGraphPipelinePropertyARM](#VkDataGraphPipelinePropertyARM) values

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

To query properties of a data graph pipeline, call:

// Provided by VK_ARM_data_graph
VkResult vkGetDataGraphPipelinePropertiesARM(
    VkDevice                                    device,
    const VkDataGraphPipelineInfoARM*           pPipelineInfo,
    uint32_t                                    propertiesCount,
    VkDataGraphPipelinePropertyQueryResultARM*  pProperties);

* 
`device` is the logical device that created the data graph pipeline.

* 
`pPipelineInfo` is a [VkDataGraphPipelineInfoARM](#VkDataGraphPipelineInfoARM) that describes
the [VkPipeline](../pipelines.html#VkPipeline) being queried.

* 
`propertiesCount` is the length of the `pProperties` array.

* 
`pProperties` is a pointer to an array of
[VkDataGraphPipelinePropertyQueryResultARM](#VkDataGraphPipelinePropertyQueryResultARM) structures.

Valid Usage

* 
[](#VUID-vkGetDataGraphPipelinePropertiesARM-dataGraphPipeline-09802) VUID-vkGetDataGraphPipelinePropertiesARM-dataGraphPipeline-09802

The `dataGraphPipeline` member of `pPipelineInfo` **must** have
been created with `device`

* 
[](#VUID-vkGetDataGraphPipelinePropertiesARM-pProperties-09889) VUID-vkGetDataGraphPipelinePropertiesARM-pProperties-09889

There **must** not be two or more structures in the `pProperties` array
with the same
[VkDataGraphPipelinePropertyQueryResultARM](#VkDataGraphPipelinePropertyQueryResultARM)::`property`

Valid Usage (Implicit)

* 
[](#VUID-vkGetDataGraphPipelinePropertiesARM-device-parameter) VUID-vkGetDataGraphPipelinePropertiesARM-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDataGraphPipelinePropertiesARM-pPipelineInfo-parameter) VUID-vkGetDataGraphPipelinePropertiesARM-pPipelineInfo-parameter

 `pPipelineInfo` **must** be a valid pointer to a valid [VkDataGraphPipelineInfoARM](#VkDataGraphPipelineInfoARM) structure

* 
[](#VUID-vkGetDataGraphPipelinePropertiesARM-pProperties-parameter) VUID-vkGetDataGraphPipelinePropertiesARM-pProperties-parameter

 `pProperties` **must** be a valid pointer to an array of `propertiesCount` [VkDataGraphPipelinePropertyQueryResultARM](#VkDataGraphPipelinePropertyQueryResultARM) structures

* 
[](#VUID-vkGetDataGraphPipelinePropertiesARM-propertiesCount-arraylength) VUID-vkGetDataGraphPipelinePropertiesARM-propertiesCount-arraylength

 `propertiesCount` **must** be greater than `0`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkDataGraphPipelineInfoARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkPipeline         dataGraphPipeline;
} VkDataGraphPipelineInfoARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`dataGraphPipeline` is a [VkPipeline](../pipelines.html#VkPipeline) handle.

Valid Usage

* 
[](#VUID-VkDataGraphPipelineInfoARM-dataGraphPipeline-09803) VUID-VkDataGraphPipelineInfoARM-dataGraphPipeline-09803

`dataGraphPipeline` **must** have been created with
[vkCreateDataGraphPipelinesARM](#vkCreateDataGraphPipelinesARM)

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineInfoARM-sType-sType) VUID-VkDataGraphPipelineInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_INFO_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDataGraphPipelineInfoARM-pNext-pNext) VUID-VkDataGraphPipelineInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDataGraphPipelineInfoARM-dataGraphPipeline-parameter) VUID-VkDataGraphPipelineInfoARM-dataGraphPipeline-parameter

 `dataGraphPipeline` **must** be a valid [VkPipeline](../pipelines.html#VkPipeline) handle

The `VkDataGraphPipelinePropertyQueryResultARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelinePropertyQueryResultARM {
    VkStructureType                   sType;
    void*                             pNext;
    VkDataGraphPipelinePropertyARM    property;
    VkBool32                          isText;
    size_t                            dataSize;
    void*                             pData;
} VkDataGraphPipelinePropertyQueryResultARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`property` is a [VkDataGraphPipelinePropertyARM](#VkDataGraphPipelinePropertyARM) specifying the
property of the data graph pipeline being queried.

* 
`isText` specifies whether the returned data is text or opaque data.
If `isText` is [VK_TRUE](../fundamentals.html#VK_TRUE) then the data returned in `pData`
is text and guaranteed to be a null-terminated UTF-8 string.

* 
`dataSize` is an integer related to the size, in bytes, of the data,
as described below.

* 
`pData` is either `NULL` or a pointer to a block of memory into
which the implementation will return the property data.

If `pData` is `NULL`, then the size, in bytes, of the property data is
returned in `dataSize`.
Otherwise, `dataSize` must be the size of the buffer, in bytes, pointed
to by `pData` and on return `dataSize` is overwritten with the
number of bytes of data actually written to `pData` including any
trailing NUL character.
If `dataSize` is less than the size, in bytes, of the property data, at
most `dataSize` bytes of data will be written to `pData`, and
[VK_INCOMPLETE](../fundamentals.html#VkResult) will be returned by
[vkGetDataGraphPipelinePropertiesARM](#vkGetDataGraphPipelinePropertiesARM) instead of [VK_SUCCESS](../fundamentals.html#VkResult), to
indicate that not all the available property data was returned.
If `isText` is [VK_TRUE](../fundamentals.html#VK_TRUE) and `pData` is not `NULL` and
`dataSize` is not zero, the last byte written to `pData` will be a
NUL character.

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelinePropertyQueryResultARM-sType-sType) VUID-VkDataGraphPipelinePropertyQueryResultARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_PROPERTY_QUERY_RESULT_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDataGraphPipelinePropertyQueryResultARM-pNext-pNext) VUID-VkDataGraphPipelinePropertyQueryResultARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDataGraphPipelinePropertyQueryResultARM-property-parameter) VUID-VkDataGraphPipelinePropertyQueryResultARM-property-parameter

 `property` **must** be a valid [VkDataGraphPipelinePropertyARM](#VkDataGraphPipelinePropertyARM) value

* 
[](#VUID-VkDataGraphPipelinePropertyQueryResultARM-pData-parameter) VUID-VkDataGraphPipelinePropertyQueryResultARM-pData-parameter

 If `dataSize` is not `0`, and `pData` is not `NULL`, `pData` **must** be a valid pointer to an array of `dataSize` bytes

Possible values of
[VkDataGraphPipelinePropertyQueryResultARM](#VkDataGraphPipelinePropertyQueryResultARM)::`property`, specifying
the property of the data graph pipeline being queried, are:

// Provided by VK_ARM_data_graph
typedef enum VkDataGraphPipelinePropertyARM {
    VK_DATA_GRAPH_PIPELINE_PROPERTY_CREATION_LOG_ARM = 0,
    VK_DATA_GRAPH_PIPELINE_PROPERTY_IDENTIFIER_ARM = 1,
} VkDataGraphPipelinePropertyARM;

* 
[VK_DATA_GRAPH_PIPELINE_PROPERTY_CREATION_LOG_ARM](#VkDataGraphPipelinePropertyARM) corresponds to a
human-readable log produced during the creation of a data graph
pipeline.
It **may** contain information about errors encountered during the creation
or other information generally useful for debugging.
This property **can** be queried for any data graph pipeline.

* 
[VK_DATA_GRAPH_PIPELINE_PROPERTY_IDENTIFIER_ARM](#VkDataGraphPipelinePropertyARM) corresponds to an
opaque identifier for the data graph pipeline.
It **can** be used to create a graph pipeline from a pipeline cache without
the need to provide any creation data beyond the identifier, using a
[VkDataGraphPipelineIdentifierCreateInfoARM](#VkDataGraphPipelineIdentifierCreateInfoARM) structure.

Data graph pipelines execute on one or more *data graph processing engines*.
Each queue family of a [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) that supports
[VK_QUEUE_DATA_GRAPH_BIT_ARM](../devsandqueues.html#VkQueueFlagBits) **may** provide access to processing engines.
Processing engines **may** be *foreign*.
Foreign processing engines require the use of external memory and semaphores
to exchange data and synchronize with data graph pipelines that target them.
Each processing engine **may** support a selection of [graph operations](#graphs-operations).
There exists a *default processing engine* that enables implementations to
support some operations without tying support to specific processing
engines.
This allows implementations to avoid being specific about the processing
engines that they use internally or to remove the necessity for applications
to choose the specific processing engine used to execute a given set of
operations.

To query the properties of a data graph processing engine for a specific
queue family of a physical device, call:

// Provided by VK_ARM_data_graph
void vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM* pQueueFamilyDataGraphProcessingEngineInfo,
    VkQueueFamilyDataGraphProcessingEnginePropertiesARM* pQueueFamilyDataGraphProcessingEngineProperties);

* 
`physicalDevice` is the physical device to query.

* 
`pQueueFamilyDataGraphProcessingEngineInfo` is a pointer to a
[VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM](#VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM)
structure that specifies the data graph processing engine and queue
family to query.

* 
`pQueueFamilyDataGraphProcessingEngineProperties` is a pointer to a
[VkQueueFamilyDataGraphProcessingEnginePropertiesARM](#VkQueueFamilyDataGraphProcessingEnginePropertiesARM) structure in
which the queries properties are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM-physicalDevice-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM-pQueueFamilyDataGraphProcessingEngineInfo-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM-pQueueFamilyDataGraphProcessingEngineInfo-parameter

 `pQueueFamilyDataGraphProcessingEngineInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM](#VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM) structure

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM-pQueueFamilyDataGraphProcessingEngineProperties-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM-pQueueFamilyDataGraphProcessingEngineProperties-parameter

 `pQueueFamilyDataGraphProcessingEngineProperties` **must** be a valid pointer to a [VkQueueFamilyDataGraphProcessingEnginePropertiesARM](#VkQueueFamilyDataGraphProcessingEnginePropertiesARM) structure

The `VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM`
structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM {
    VkStructureType                                     sType;
    const void*                                         pNext;
    uint32_t                                            queueFamilyIndex;
    VkPhysicalDeviceDataGraphProcessingEngineTypeARM    engineType;
} VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`queueFamilyIndex` specifies the queue family being queried.

* 
`engineType` is a
[VkPhysicalDeviceDataGraphProcessingEngineTypeARM](#VkPhysicalDeviceDataGraphProcessingEngineTypeARM) specifying the
engine type whose properties are being queried.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM-sType-sType) VUID-VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_QUEUE_FAMILY_DATA_GRAPH_PROCESSING_ENGINE_INFO_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM-pNext-pNext) VUID-VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM-engineType-parameter) VUID-VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM-engineType-parameter

 `engineType` **must** be a valid [VkPhysicalDeviceDataGraphProcessingEngineTypeARM](#VkPhysicalDeviceDataGraphProcessingEngineTypeARM) value

The `VkQueueFamilyDataGraphProcessingEnginePropertiesARM` structure is
defined as:

// Provided by VK_ARM_data_graph
typedef struct VkQueueFamilyDataGraphProcessingEnginePropertiesARM {
    VkStructureType                       sType;
    void*                                 pNext;
    VkExternalSemaphoreHandleTypeFlags    foreignSemaphoreHandleTypes;
    VkExternalMemoryHandleTypeFlags       foreignMemoryHandleTypes;
} VkQueueFamilyDataGraphProcessingEnginePropertiesARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`foreignSemaphoreHandleTypes` is a
[VkExternalSemaphoreHandleTypeFlags](../capabilities.html#VkExternalSemaphoreHandleTypeFlags) that describes the external
semaphore handle types supported by a foreign data graph processing
engine.

* 
`foreignMemoryHandleTypes` is a
[VkExternalMemoryHandleTypeFlags](../capabilities.html#VkExternalMemoryHandleTypeFlags) that describes the external memory
handle types supported by a foreign data graph processing engine.

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyDataGraphProcessingEnginePropertiesARM-sType-sType) VUID-VkQueueFamilyDataGraphProcessingEnginePropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_DATA_GRAPH_PROCESSING_ENGINE_PROPERTIES_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkQueueFamilyDataGraphProcessingEnginePropertiesARM-pNext-pNext) VUID-VkQueueFamilyDataGraphProcessingEnginePropertiesARM-pNext-pNext

 `pNext` **must** be `NULL`

The `VkPhysicalDeviceDataGraphProcessingEngineARM` structure is defined
as:

// Provided by VK_ARM_data_graph
typedef struct VkPhysicalDeviceDataGraphProcessingEngineARM {
    VkPhysicalDeviceDataGraphProcessingEngineTypeARM    type;
    VkBool32                                            isForeign;
} VkPhysicalDeviceDataGraphProcessingEngineARM;

* 
`type` is a [VkPhysicalDeviceDataGraphProcessingEngineTypeARM](#VkPhysicalDeviceDataGraphProcessingEngineTypeARM)
that specifies the type of the processing engine.

* 
`isForeign` specifies whether the processing engine is foreign.

The defined data graph processing engines are:

// Provided by VK_ARM_data_graph
typedef enum VkPhysicalDeviceDataGraphProcessingEngineTypeARM {
    VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_DEFAULT_ARM = 0,
  // Provided by VK_QCOM_data_graph_model
    VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_NEURAL_QCOM = 1000629000,
  // Provided by VK_QCOM_data_graph_model
    VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_COMPUTE_QCOM = 1000629001,
} VkPhysicalDeviceDataGraphProcessingEngineTypeARM;

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_DEFAULT_ARM](#VkPhysicalDeviceDataGraphProcessingEngineTypeARM)
corresponds to the default data graph processing engine.

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_NEURAL_QCOM](#VkPhysicalDeviceDataGraphProcessingEngineTypeARM)
specifies an engine that specializes in neural processing.

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_COMPUTE_QCOM](#VkPhysicalDeviceDataGraphProcessingEngineTypeARM)
specifies an engine that uses compute processing to execute data graphs.

The `VkDataGraphProcessingEngineCreateInfoARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphProcessingEngineCreateInfoARM {
    VkStructureType                                  sType;
    const void*                                      pNext;
    uint32_t                                         processingEngineCount;
    VkPhysicalDeviceDataGraphProcessingEngineARM*    pProcessingEngines;
} VkDataGraphProcessingEngineCreateInfoARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`processingEngineCount` is the number of elements in
`pProcessingEngines`.

* 
`pProcessingEngines` is a pointer to an array of
`processingEngineCount`
[VkPhysicalDeviceDataGraphProcessingEngineARM](#VkPhysicalDeviceDataGraphProcessingEngineARM) structures.

Valid Usage

* 
[](#VUID-VkDataGraphProcessingEngineCreateInfoARM-dataGraph-09953) VUID-VkDataGraphProcessingEngineCreateInfoARM-dataGraph-09953

The [`dataGraph`](../features.html#features-dataGraph) feature **must** be enabled

* 
[](#VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-09918) VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-09918

`pProcessingEngines` **must** not contain identical
[VkPhysicalDeviceDataGraphProcessingEngineARM](#VkPhysicalDeviceDataGraphProcessingEngineARM) structures

* 
[](#VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-09956) VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-09956

For each element of `pProcessingEngines`, its `type` member
**must** be a valid [VkPhysicalDeviceDataGraphProcessingEngineTypeARM](#VkPhysicalDeviceDataGraphProcessingEngineTypeARM)
value

* 
[](#VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-11843) VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-11843

If any element of `pProcessingEngines` has a `type` of
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_NEURAL_QCOM](#VkPhysicalDeviceDataGraphProcessingEngineTypeARM)
or
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_COMPUTE_QCOM](#VkPhysicalDeviceDataGraphProcessingEngineTypeARM)
and `isForeign` set to [VK_TRUE](../fundamentals.html#VK_TRUE), `processingEngineCount`
**must** equal `1`

* 
[](#VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-11844) VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-11844

If any element of `pProcessingEngines` has a `type` of
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_NEURAL_QCOM](#VkPhysicalDeviceDataGraphProcessingEngineTypeARM)
or
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_COMPUTE_QCOM](#VkPhysicalDeviceDataGraphProcessingEngineTypeARM),
the [dataGraphModel](../features.html#features-dataGraphModelQCOM) feature **must** be
enabled

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphProcessingEngineCreateInfoARM-sType-sType) VUID-VkDataGraphProcessingEngineCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PROCESSING_ENGINE_CREATE_INFO_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-parameter) VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-parameter

 `pProcessingEngines` **must** be a valid pointer to an array of `processingEngineCount` [VkPhysicalDeviceDataGraphProcessingEngineARM](#VkPhysicalDeviceDataGraphProcessingEngineARM) structures

* 
[](#VUID-VkDataGraphProcessingEngineCreateInfoARM-processingEngineCount-arraylength) VUID-VkDataGraphProcessingEngineCreateInfoARM-processingEngineCount-arraylength

 `processingEngineCount` **must** be greater than `0`

Structure Chaining

[Extends the structures](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandPoolCreateInfo](../cmdbuffers.html#VkCommandPoolCreateInfo)

* 
[VkDataGraphPipelineCreateInfoARM](#VkDataGraphPipelineCreateInfoARM)

* 
[VkDescriptorPoolCreateInfo](../descriptorsets.html#VkDescriptorPoolCreateInfo)

Data graph processing engines execute *data graph operations*.
Operations **may** be of a fixed-function nature, configurable or not, or **may**
, for example, be provided as part of a SPIR-V extended instruction set.

To query the data graph processing engines and operations they support for a
specific queue family of a physical device, call:

// Provided by VK_ARM_data_graph
VkResult vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    uint32_t*                                   pQueueFamilyDataGraphPropertyCount,
    VkQueueFamilyDataGraphPropertiesARM*        pQueueFamilyDataGraphProperties);

* 
`physicalDevice` is the physical device to query.

* 
`queueFamilyIndex` is the index of the queue family being queried.

* 
`pQueueFamilyDataGraphPropertyCount` is a pointer to an integer
related to the number of properties available or queried.

* 
`pQueueFamilyDataGraphProperties` is either `NULL` or a pointer to
an array of [VkQueueFamilyDataGraphPropertiesARM](#VkQueueFamilyDataGraphPropertiesARM) structures.

If `pQueueFamilyDataGraphProperties` is `NULL`, then the number of
properties available is returned in
`pQueueFamilyDataGraphPropertyCount`.
Otherwise, `pQueueFamilyDataGraphPropertyCount` **must** point to a
variable set by the application to the number of elements in the
`pQueueFamilyDataGraphProperties` array, and on return the variable is
overwritten with the number of structures actually written to
`pQueueFamilyDataGraphProperties`.
If `pQueueFamilyDataGraphPropertyCount` is less than the number of
properties available, at most `pQueueFamilyDataGraphPropertyCount`
structures will be written, and [VK_INCOMPLETE](../fundamentals.html#VkResult) will be returned instead
of [VK_SUCCESS](../fundamentals.html#VkResult), to indicate that not all the available properties were
returned.

If the [dataGraphModel](../features.html#features-dataGraphModelQCOM) feature is supported,
the implementation **must** return at least one property with engine type
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_NEURAL_QCOM](#VkPhysicalDeviceDataGraphProcessingEngineTypeARM) or
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_COMPUTE_QCOM](#VkPhysicalDeviceDataGraphProcessingEngineTypeARM).

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM-physicalDevice-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM-pQueueFamilyDataGraphPropertyCount-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM-pQueueFamilyDataGraphPropertyCount-parameter

 `pQueueFamilyDataGraphPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM-pQueueFamilyDataGraphProperties-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM-pQueueFamilyDataGraphProperties-parameter

 If the value referenced by `pQueueFamilyDataGraphPropertyCount` is not `0`, and `pQueueFamilyDataGraphProperties` is not `NULL`, `pQueueFamilyDataGraphProperties` **must** be a valid pointer to an array of `pQueueFamilyDataGraphPropertyCount` [VkQueueFamilyDataGraphPropertiesARM](#VkQueueFamilyDataGraphPropertiesARM) structures

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkQueueFamilyDataGraphPropertiesARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkQueueFamilyDataGraphPropertiesARM {
    VkStructureType                                 sType;
    void*                                           pNext;
    VkPhysicalDeviceDataGraphProcessingEngineARM    engine;
    VkPhysicalDeviceDataGraphOperationSupportARM    operation;
} VkQueueFamilyDataGraphPropertiesARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`engine` is a [VkPhysicalDeviceDataGraphProcessingEngineARM](#VkPhysicalDeviceDataGraphProcessingEngineARM)
structure describing a data graph processing engine.

* 
`operation` is a [VkPhysicalDeviceDataGraphOperationSupportARM](#VkPhysicalDeviceDataGraphOperationSupportARM)
structure describing one or more operations supported by a data graph
processing engine.

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyDataGraphPropertiesARM-sType-sType) VUID-VkQueueFamilyDataGraphPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_DATA_GRAPH_PROPERTIES_ARM](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkQueueFamilyDataGraphPropertiesARM-pNext-pNext) VUID-VkQueueFamilyDataGraphPropertiesARM-pNext-pNext

 `pNext` **must** be `NULL`

The `VkPhysicalDeviceDataGraphOperationSupportARM` structure is defined
as:

// Provided by VK_ARM_data_graph
typedef struct VkPhysicalDeviceDataGraphOperationSupportARM {
    VkPhysicalDeviceDataGraphOperationTypeARM    operationType;
    char                                         name[VK_MAX_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_SET_NAME_SIZE_ARM];
    uint32_t                                     version;
} VkPhysicalDeviceDataGraphOperationSupportARM;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`operationType` is a [VkPhysicalDeviceDataGraphOperationTypeARM](#VkPhysicalDeviceDataGraphOperationTypeARM)
enum specifying the type of the operation whose support is being
described.

* 
`name` is a pointer to a null-terminated UTF-8 string specifying the
name of the operation whose support is being described.

* 
`version` is an integer specifying the version of the operation
whose support is being described.

[VK_MAX_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_SET_NAME_SIZE_ARM](#VK_MAX_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_SET_NAME_SIZE_ARM) is the
length in `char` values of an array containing the name of a data graph
operation, as returned in
[VkPhysicalDeviceDataGraphOperationSupportARM](#VkPhysicalDeviceDataGraphOperationSupportARM)::`name`.

#define VK_MAX_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_SET_NAME_SIZE_ARM 128U

The defined data graph operations are:

// Provided by VK_ARM_data_graph
typedef enum VkPhysicalDeviceDataGraphOperationTypeARM {
    VK_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_TYPE_SPIRV_EXTENDED_INSTRUCTION_SET_ARM = 0,
  // Provided by VK_QCOM_data_graph_model
    VK_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_TYPE_NEURAL_MODEL_QCOM = 1000629000,
  // Provided by VK_QCOM_data_graph_model
    VK_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_TYPE_BUILTIN_MODEL_QCOM = 1000629001,
} VkPhysicalDeviceDataGraphOperationTypeARM;

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_TYPE_SPIRV_EXTENDED_INSTRUCTION_SET_ARM](#VkPhysicalDeviceDataGraphOperationTypeARM)
corresponds to operations provided by a SPIR-V extended instruction set.

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_TYPE_NEURAL_MODEL_QCOM](#VkPhysicalDeviceDataGraphOperationTypeARM)
specifies an operation that executes neural models provided by the
application.

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_TYPE_BUILTIN_MODEL_QCOM](#VkPhysicalDeviceDataGraphOperationTypeARM)
specifies an operation that executes specialized built-in models
provided by the implementation.
