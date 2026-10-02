# VkPhysicalDeviceRobustness2FeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceRobustness2FeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceRobustness2FeaturesKHR - Structure describing the out-of-bounds behavior for an implementation

The `VkPhysicalDeviceRobustness2FeaturesKHR` structure is defined as:

// Provided by VK_KHR_robustness2
typedef struct VkPhysicalDeviceRobustness2FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           robustBufferAccess2;
    VkBool32           robustImageAccess2;
    VkBool32           nullDescriptor;
} VkPhysicalDeviceRobustness2FeaturesKHR;

// Provided by VK_EXT_robustness2
// Equivalent to VkPhysicalDeviceRobustness2FeaturesKHR
typedef VkPhysicalDeviceRobustness2FeaturesKHR VkPhysicalDeviceRobustness2FeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `robustBufferAccess2` enables
[Robust Buffer Access 2](../../../../spec/latest/chapters/shaders.html#shaders-robust-buffer-access2) guarantees for shader buffer accesses.

* 
 `robustImageAccess2` enables
[Robust Image Access 2](../../../../spec/latest/chapters/shaders.html#shaders-robust-image-access2) guarantees for shader image accesses.

* 
 `nullDescriptor` indicates
whether descriptors **can** be written with a [VK_NULL_HANDLE](VK_NULL_HANDLE.html) resource
or view, which are considered valid to access and act as if the
descriptor were bound to nothing.

If the `VkPhysicalDeviceRobustness2FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceRobustness2FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage

* 
[](#VUID-VkPhysicalDeviceRobustness2FeaturesKHR-robustBufferAccess2-04000) VUID-VkPhysicalDeviceRobustness2FeaturesKHR-robustBufferAccess2-04000

If `robustBufferAccess2` is enabled then
[`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess) **must** also be
enabled

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRobustness2FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceRobustness2FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ROBUSTNESS_2_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_robustness2](VK_EXT_robustness2.html), [VK_KHR_robustness2](VK_KHR_robustness2.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceRobustness2FeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
