# VkPhysicalDeviceDepthClampZeroOneFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDepthClampZeroOneFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDepthClampZeroOneFeaturesKHR - Structure describing feature to control zero to one depth clamping

The `VkPhysicalDeviceDepthClampZeroOneFeaturesKHR` structure is defined
as:

// Provided by VK_KHR_depth_clamp_zero_one
typedef struct VkPhysicalDeviceDepthClampZeroOneFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           depthClampZeroOne;
} VkPhysicalDeviceDepthClampZeroOneFeaturesKHR;

// Provided by VK_EXT_depth_clamp_zero_one
// Equivalent to VkPhysicalDeviceDepthClampZeroOneFeaturesKHR
typedef VkPhysicalDeviceDepthClampZeroOneFeaturesKHR VkPhysicalDeviceDepthClampZeroOneFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `depthClampZeroOne` indicates that
the implementation supports clamping the depth to a range of `0` to `1`.

If the `VkPhysicalDeviceDepthClampZeroOneFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceDepthClampZeroOneFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDepthClampZeroOneFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceDepthClampZeroOneFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_CLAMP_ZERO_ONE_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_depth_clamp_zero_one](VK_EXT_depth_clamp_zero_one.html), [VK_KHR_depth_clamp_zero_one](VK_KHR_depth_clamp_zero_one.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceDepthClampZeroOneFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
