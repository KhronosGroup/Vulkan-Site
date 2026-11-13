# VkDebugUtilsObjectNameInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDebugUtilsObjectNameInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDebugUtilsObjectNameInfoEXT - Specify parameters of a name to give to an object

The `VkDebugUtilsObjectNameInfoEXT` structure is defined as:

// Provided by VK_EXT_debug_utils
typedef struct VkDebugUtilsObjectNameInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkObjectType       objectType;
    uint64_t           objectHandle;
    const char*        pObjectName;
} VkDebugUtilsObjectNameInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`objectType` is a [VkObjectType](VkObjectType.html) specifying the type of the
object to be named.

* 
`objectHandle` is the object to be named.

* 
`pObjectName` is either `NULL` or a null-terminated UTF-8 string
specifying the name to apply to `objectHandle`.

Applications **may** change the name associated with an object simply by
calling `vkSetDebugUtilsObjectNameEXT` again with a new string.
If `pObjectName` is either `NULL` or an empty string, then any
previously set name is removed.

The [`graphicsPipelineLibrary`](../../../../spec/latest/chapters/features.html#features-graphicsPipelineLibrary)
feature allows the specification of pipelines without the creation of
[VkShaderModule](VkShaderModule.html) objects beforehand.
In order to continue to allow naming these shaders independently,
`VkDebugUtilsObjectNameInfoEXT` **can** be included in the `pNext`
chain of [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html), which associates a static
name with that particular shader.

This structure **can** be included in the `pNext` chain of
[VkResourceDescriptorInfoEXT](VkResourceDescriptorInfoEXT.html) or [VkSamplerCreateInfo](VkSamplerCreateInfo.html) to label a
descriptor or embedded sampler.
This structure **may** be ignored when included in the `pNext` chain of
[VkSamplerCreateInfo](VkSamplerCreateInfo.html) when creating a sampler object.
The label **must** remain valid while the descriptor is valid; it **may** be
discarded if it becomes invalid.

Valid Usage

* 
[](#VUID-VkDebugUtilsObjectNameInfoEXT-objectType-02589) VUID-VkDebugUtilsObjectNameInfoEXT-objectType-02589

If `objectType` is [VK_OBJECT_TYPE_UNKNOWN](VkObjectType.html), `objectHandle`
**must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkDebugUtilsObjectNameInfoEXT-objectType-02590) VUID-VkDebugUtilsObjectNameInfoEXT-objectType-02590

If `objectType` is not [VK_OBJECT_TYPE_UNKNOWN](VkObjectType.html),
`objectHandle` **must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or a valid Vulkan
handle of the type associated with `objectType` as defined in the
[`VkObjectType` and Vulkan Handle    Relationship](../../../../spec/latest/chapters/debugging.html#debugging-object-types) table

Valid Usage (Implicit)

* 
[](#VUID-VkDebugUtilsObjectNameInfoEXT-sType-sType) VUID-VkDebugUtilsObjectNameInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_UTILS_OBJECT_NAME_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDebugUtilsObjectNameInfoEXT-objectType-parameter) VUID-VkDebugUtilsObjectNameInfoEXT-objectType-parameter

 `objectType` **must** be a valid [VkObjectType](VkObjectType.html) value

* 
[](#VUID-VkDebugUtilsObjectNameInfoEXT-pObjectName-parameter) VUID-VkDebugUtilsObjectNameInfoEXT-pObjectName-parameter

 If `pObjectName` is not `NULL`, `pObjectName` **must** be a null-terminated UTF-8 string

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html)

* 
[VkResourceDescriptorInfoEXT](VkResourceDescriptorInfoEXT.html)

* 
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)

[VK_EXT_debug_utils](VK_EXT_debug_utils.html), [VkDebugUtilsMessengerCallbackDataEXT](VkDebugUtilsMessengerCallbackDataEXT.html), [VkObjectType](VkObjectType.html), [VkStructureType](VkStructureType.html), [vkSetDebugUtilsObjectNameEXT](vkSetDebugUtilsObjectNameEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDebugUtilsObjectNameInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
