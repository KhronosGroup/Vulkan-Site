# VkPhysicalDeviceMultiviewFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMultiviewFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMultiviewFeatures - Structure describing multiview features that can be supported by an implementation

The `VkPhysicalDeviceMultiviewFeatures` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceMultiviewFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           multiview;
    VkBool32           multiviewGeometryShader;
    VkBool32           multiviewTessellationShader;
} VkPhysicalDeviceMultiviewFeatures;

// Provided by VK_KHR_multiview
// Equivalent to VkPhysicalDeviceMultiviewFeatures
typedef VkPhysicalDeviceMultiviewFeatures VkPhysicalDeviceMultiviewFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `multiview` specifies whether
the implementation supports multiview rendering within a render pass.
If this feature is not enabled, the view mask of each subpass **must**
always be zero.

* 
 `multiviewGeometryShader`
specifies whether the implementation supports multiview rendering within
a render pass, with [geometry shaders](../../../../spec/latest/chapters/geometry.html#geometry).
If this feature is not enabled, then a pipeline compiled against a
subpass with a non-zero view mask **must** not include a geometry shader.

* 

`multiviewTessellationShader` specifies whether the implementation
supports multiview rendering within a render pass, with
[tessellation shaders](../../../../spec/latest/chapters/tessellation.html#tessellation).
If this feature is not enabled, then a pipeline compiled against a
subpass with a non-zero view mask **must** not include any tessellation
shaders.

If the `VkPhysicalDeviceMultiviewFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceMultiviewFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage

* 
[](#VUID-VkPhysicalDeviceMultiviewFeatures-multiviewGeometryShader-00580) VUID-VkPhysicalDeviceMultiviewFeatures-multiviewGeometryShader-00580

If `multiviewGeometryShader` is enabled then `multiview` **must**
also be enabled

* 
[](#VUID-VkPhysicalDeviceMultiviewFeatures-multiviewTessellationShader-00581) VUID-VkPhysicalDeviceMultiviewFeatures-multiviewTessellationShader-00581

If `multiviewTessellationShader` is enabled then `multiview`
**must** also be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMultiviewFeatures-sType-sType) VUID-VkPhysicalDeviceMultiviewFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_multiview](VK_KHR_multiview.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceMultiviewFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
