# VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM - Structure describing multiview per view viewports features that can be supported by an implementation

The `VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM` structure is
defined as:

// Provided by VK_QCOM_multiview_per_view_viewports
typedef struct VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           multiviewPerViewViewports;
} VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM;

This structure describes the following features:

* 
 `multiviewPerViewViewports`
indicates that the implementation supports multiview per-view viewports.

If the `VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PER_VIEW_VIEWPORTS_FEATURES_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_QCOM_multiview_per_view_viewports](VK_QCOM_multiview_per_view_viewports.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
