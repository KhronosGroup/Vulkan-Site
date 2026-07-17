# VkRenderPassStripeBeginInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassStripeBeginInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassStripeBeginInfoARM - Structure specifying striped rendering information

The `VkRenderPassStripeBeginInfoARM` structure is defined as:

// Provided by VK_ARM_render_pass_striped
typedef struct VkRenderPassStripeBeginInfoARM {
    VkStructureType                     sType;
    const void*                         pNext;
    uint32_t                            stripeInfoCount;
    const VkRenderPassStripeInfoARM*    pStripeInfos;
} VkRenderPassStripeBeginInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stripeInfoCount` is the number of stripes in this render pass
instance

* 
`pStripeInfos` is a pointer to an array of `stripeInfoCount`
[VkRenderPassStripeInfoARM](VkRenderPassStripeInfoARM.html) structures describing the stripes used
by the render pass instance.

This structure can be included in the `pNext` chain of
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)
or [VkRenderingInfo](VkRenderingInfo.html)
to define how the render pass instance is split into stripes.

Valid Usage

* 
[](#VUID-VkRenderPassStripeBeginInfoARM-stripeInfoCount-09450) VUID-VkRenderPassStripeBeginInfoARM-stripeInfoCount-09450

`stripeInfoCount` **must** be less than or equal to
`VkPhysicalDeviceRenderPassStripedPropertiesARM`::`maxRenderPassStripes`

* 
[](#VUID-VkRenderPassStripeBeginInfoARM-stripeArea-09451) VUID-VkRenderPassStripeBeginInfoARM-stripeArea-09451

The `stripeArea` defined by each element of `pStripeInfos` **must**
not overlap the `stripeArea` of any other element

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassStripeBeginInfoARM-sType-sType) VUID-VkRenderPassStripeBeginInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_STRIPE_BEGIN_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkRenderPassStripeBeginInfoARM-pStripeInfos-parameter) VUID-VkRenderPassStripeBeginInfoARM-pStripeInfos-parameter

 `pStripeInfos` **must** be a valid pointer to an array of `stripeInfoCount` valid [VkRenderPassStripeInfoARM](VkRenderPassStripeInfoARM.html) structures

* 
[](#VUID-VkRenderPassStripeBeginInfoARM-stripeInfoCount-arraylength) VUID-VkRenderPassStripeBeginInfoARM-stripeInfoCount-arraylength

 `stripeInfoCount` **must** be greater than `0`

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)

* 
[VkRenderingInfo](VkRenderingInfo.html)

[VK_ARM_render_pass_striped](VK_ARM_render_pass_striped.html), [VkRenderPassStripeInfoARM](VkRenderPassStripeInfoARM.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassStripeBeginInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
