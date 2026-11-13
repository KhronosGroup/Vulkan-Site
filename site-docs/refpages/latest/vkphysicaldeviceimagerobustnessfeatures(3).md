# VkPhysicalDeviceImageRobustnessFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceImageRobustnessFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceImageRobustnessFeatures - Structure describing the out-of-bounds behavior for an implementation

The `VkPhysicalDeviceImageRobustnessFeatures` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceImageRobustnessFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           robustImageAccess;
} VkPhysicalDeviceImageRobustnessFeatures;

// Provided by VK_EXT_image_robustness
// Equivalent to VkPhysicalDeviceImageRobustnessFeatures
typedef VkPhysicalDeviceImageRobustnessFeatures VkPhysicalDeviceImageRobustnessFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `robustImageAccess`
enables [Robust Image Access](../../../../spec/latest/chapters/shaders.html#shaders-robust-image-access) guarantees for shader image
accesses.

If the `VkPhysicalDeviceImageRobustnessFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceImageRobustnessFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageRobustnessFeatures-sType-sType) VUID-VkPhysicalDeviceImageRobustnessFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_ROBUSTNESS_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_image_robustness](VK_EXT_image_robustness.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceImageRobustnessFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
