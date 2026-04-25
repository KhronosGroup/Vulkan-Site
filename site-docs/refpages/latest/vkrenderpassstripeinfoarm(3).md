# VkRenderPassStripeInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassStripeInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassStripeInfoARM - Structure specifying per rendering stripe information

The `VkRenderPassStripeInfoARM` structure is defined as:

// Provided by VK_ARM_render_pass_striped
typedef struct VkRenderPassStripeInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkRect2D           stripeArea;
} VkRenderPassStripeInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stripeArea` is the stripe area, and is described in more detail
below.

`stripeArea` is the render area that is affected by this stripe of the
render pass instance.
It **must** be a subregion of the `renderArea` of the render pass instance.

Valid Usage

* 
[](#VUID-VkRenderPassStripeInfoARM-stripeArea-09452) VUID-VkRenderPassStripeInfoARM-stripeArea-09452

`stripeArea.offset.x` **must** be a multiple of
[VkPhysicalDeviceRenderPassStripedPropertiesARM](VkPhysicalDeviceRenderPassStripedPropertiesARM.html)::`renderPassStripeGranularity.width`

* 
[](#VUID-VkRenderPassStripeInfoARM-stripeArea-09453) VUID-VkRenderPassStripeInfoARM-stripeArea-09453

`stripeArea.extent.width` **must** be a multiple of
[VkPhysicalDeviceRenderPassStripedPropertiesARM](VkPhysicalDeviceRenderPassStripedPropertiesARM.html)::`renderPassStripeGranularity.width`,
or the sum of `stripeArea.offset.x` and
`stripeArea.extent.width` **must** be equal to the
`renderArea.extent.width` of the render pass instance

* 
[](#VUID-VkRenderPassStripeInfoARM-stripeArea-09454) VUID-VkRenderPassStripeInfoARM-stripeArea-09454

`stripeArea.offset.y` **must** be a multiple of
[VkPhysicalDeviceRenderPassStripedPropertiesARM](VkPhysicalDeviceRenderPassStripedPropertiesARM.html)::`renderPassStripeGranularity.height`

* 
[](#VUID-VkRenderPassStripeInfoARM-stripeArea-09455) VUID-VkRenderPassStripeInfoARM-stripeArea-09455

`stripeArea.extent.height` **must** be a multiple of
[VkPhysicalDeviceRenderPassStripedPropertiesARM](VkPhysicalDeviceRenderPassStripedPropertiesARM.html)::`renderPassStripeGranularity.height`,
or the sum of `stripeArea.offset.y` and
`stripeArea.extent.height` **must** be equal to the
`renderArea.extent.height` of the render pass instance

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassStripeInfoARM-sType-sType) VUID-VkRenderPassStripeInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_STRIPE_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkRenderPassStripeInfoARM-pNext-pNext) VUID-VkRenderPassStripeInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

[VK_ARM_render_pass_striped](VK_ARM_render_pass_striped.html), [VkRect2D](VkRect2D.html), [VkRenderPassStripeBeginInfoARM](VkRenderPassStripeBeginInfoARM.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassStripeInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
