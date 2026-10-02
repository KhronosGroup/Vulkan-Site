# VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT - Structure describing whether rasterization order attachment access can be supported by an implementation

The `VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT`
structure is defined as:

// Provided by VK_EXT_rasterization_order_attachment_access
typedef struct VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           rasterizationOrderColorAttachmentAccess;
    VkBool32           rasterizationOrderDepthAttachmentAccess;
    VkBool32           rasterizationOrderStencilAttachmentAccess;
} VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT;

// Provided by VK_ARM_rasterization_order_attachment_access
// Equivalent to VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT
typedef VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesARM;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`rasterizationOrderColorAttachmentAccess` indicates that
rasterization order access to color and input attachments is supported
by the implementation.

* 

`rasterizationOrderDepthAttachmentAccess` indicates that
rasterization order access to the depth aspect of depth/stencil and
input attachments is supported by the implementation.

* 

`rasterizationOrderStencilAttachmentAccess` indicates that
rasterization order access to the stencil aspect of depth/stencil and
input attachments is supported by the implementation.

If the `VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_ARM_rasterization_order_attachment_access](VK_ARM_rasterization_order_attachment_access.html), [VK_EXT_rasterization_order_attachment_access](VK_EXT_rasterization_order_attachment_access.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
