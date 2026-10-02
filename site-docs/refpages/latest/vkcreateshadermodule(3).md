# vkCreateShaderModule(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateShaderModule.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateShaderModule - Creates a new shader module object

To create a shader module, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateShaderModule(
    VkDevice                                    device,
    const VkShaderModuleCreateInfo*             pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkShaderModule*                             pShaderModule);

* 
`device` is the logical device that creates the shader module.

* 
`pCreateInfo` is a pointer to a [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html)
structure.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pShaderModule` is a pointer to a [VkShaderModule](VkShaderModule.html) handle in
which the resulting shader module object is returned.

Once a shader module has been created, any entry points it contains **can** be
used in pipeline shader stages as described in [Compute Pipelines](../../../../spec/latest/chapters/pipelines.html#pipelines-compute)
and [Graphics Pipelines](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics)
.

|  | If
| --- | --- |
the [`maintenance5`](../../../../spec/latest/chapters/features.html#features-maintenance5) feature
is enabled, shader module creation can be omitted entirely.
Instead, applications should provide the [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html)
structure directly in to pipeline creation by chaining it to
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html).
This avoids the overhead of creating and managing an additional object. |

Valid Usage

* 
[](#VUID-vkCreateShaderModule-pCreateInfo-06904) VUID-vkCreateShaderModule-pCreateInfo-06904

If `pCreateInfo` is not `NULL`, `pCreateInfo->pNext` **must** be
`NULL`
or a pointer to a valid instance of

[VkShaderModuleValidationCacheCreateInfoEXT](VkShaderModuleValidationCacheCreateInfoEXT.html)

* 
[VkValidationFeaturesEXT](VkValidationFeaturesEXT.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateShaderModule-device-parameter) VUID-vkCreateShaderModule-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateShaderModule-pCreateInfo-parameter) VUID-vkCreateShaderModule-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html) structure

* 
[](#VUID-vkCreateShaderModule-pAllocator-parameter) VUID-vkCreateShaderModule-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateShaderModule-pShaderModule-parameter) VUID-vkCreateShaderModule-pShaderModule-parameter

 `pShaderModule` **must** be a valid pointer to a [VkShaderModule](VkShaderModule.html) handle

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_SHADER_NV](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkShaderModule](VkShaderModule.html), [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkCreateShaderModule).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
