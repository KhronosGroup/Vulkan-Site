# VkPhysicalDeviceMaintenance10FeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMaintenance10FeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMaintenance10FeaturesKHR - Structure describing whether the implementation supports maintenance10 functionality

The `VkPhysicalDeviceMaintenance10FeaturesKHR` structure is defined as:

// Provided by VK_KHR_maintenance10
typedef struct VkPhysicalDeviceMaintenance10FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           maintenance10;
} VkPhysicalDeviceMaintenance10FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maintenance10` indicates that the
implementation supports the following:

New image format feature bits that indicate support for copying depth
or stencil aspects using non-graphics queue families

* 
If [vkCmdSetSampleMaskEXT](vkCmdSetSampleMaskEXT.html) is called with `pSampleMask` set to
`NULL`, it is treated as if the mask has all bits set to `1`.

* 
Add [vkCmdEndRendering2KHR](vkCmdEndRendering2KHR.html) as an extensible version of
[vkCmdEndRendering](vkCmdEndRendering.html)

* 
Add input attachment information to dynamic rendering

* 
Require that vertex inputs follow sRGB encoding when those formats are
used, instead of being underspecified.

* 
Add a query to determine if sRGB images are resolved in nonlinear or
linear space by default

* 
Add an optional feature to allow applications to override the default
sRGB resolve behavior

* 
Add resolve mode and depth-stencil resolve support to
`vkCmdResolveImage2` to bring it in-line with render pass attachment
resolves

If the `VkPhysicalDeviceMaintenance10FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceMaintenance10FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance10FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceMaintenance10FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_10_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_maintenance10](VK_KHR_maintenance10.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceMaintenance10FeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
