# VkPhysicalDeviceLinearColorAttachmentFeaturesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceLinearColorAttachmentFeaturesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceLinearColorAttachmentFeaturesNV - Structure describing whether [Linear Color Attachment](../../../../spec/latest/appendices/glossary.html#glossary-linear-color-attachment) rendering is supported by the implementation

The `VkPhysicalDeviceLinearColorAttachmentFeaturesNV` structure is
defined as:

// Provided by VK_NV_linear_color_attachment
typedef struct VkPhysicalDeviceLinearColorAttachmentFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           linearColorAttachment;
} VkPhysicalDeviceLinearColorAttachmentFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `linearColorAttachment` indicates
whether the implementation supports renderable
[Linear Color Attachment](../../../../spec/latest/appendices/glossary.html#glossary-linear-color-attachment)

If the `VkPhysicalDeviceLinearColorAttachmentFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceLinearColorAttachmentFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceLinearColorAttachmentFeaturesNV-sType-sType) VUID-VkPhysicalDeviceLinearColorAttachmentFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINEAR_COLOR_ATTACHMENT_FEATURES_NV](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_NV_linear_color_attachment](VK_NV_linear_color_attachment.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceLinearColorAttachmentFeaturesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
