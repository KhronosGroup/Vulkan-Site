# VkRenderPassStripeSubmitInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassStripeSubmitInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassStripeSubmitInfoARM - Structure specifying striped rendering submit information

The `VkRenderPassStripeSubmitInfoARM` structure is defined as:

// Provided by VK_ARM_render_pass_striped
typedef struct VkRenderPassStripeSubmitInfoARM {
    VkStructureType                 sType;
    const void*                     pNext;
    uint32_t                        stripeSemaphoreInfoCount;
    const VkSemaphoreSubmitInfo*    pStripeSemaphoreInfos;
} VkRenderPassStripeSubmitInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stripeSemaphoreInfoCount` is the number of semaphores used to
signal stripe completion in the render pass instances in the submitted
command buffer.

* 
`pStripeSemaphoreInfos` is a pointer to an array of
`stripeSemaphoreInfoCount` [VkSemaphoreSubmitInfo](VkSemaphoreSubmitInfo.html) structures
describing the semaphores used to signal stripe completion.

This structure can be included in the `pNext` chain of
[VkCommandBufferSubmitInfo](VkCommandBufferSubmitInfo.html) to provide a set of semaphores to be
signaled for each striped render pass instance.

The elements of `pStripeSemaphoreInfos` are mapped to render pass
instances in [VkCommandBufferSubmitInfo](VkCommandBufferSubmitInfo.html)::`commandBuffer` in
submission order and in stripe order within each render pass instance.
Each semaphore in `pStripeSemaphoreInfos` is signaled when the
implementation has completed execution of the associated stripe.
In a render pass instance that has multiview enabled, the stripe includes
all views in the view mask.
In a render pass instance with `layerCount` greater than 1, the stripe
includes all layers.

Render pass instances that specify the [VK_RENDERING_RESUMING_BIT](VkRenderingFlagBits.html) will
not have any elements of `pStripeSemaphoreInfos` mapped to them.
Instead, for suspending and resuming render pass instances, this mapping is
done for the first suspending render pass instance, and the per-stripe
semaphores are only signaled for the last resuming render pass instance.

Valid Usage

* 
[](#VUID-VkRenderPassStripeSubmitInfoARM-semaphore-09447) VUID-VkRenderPassStripeSubmitInfoARM-semaphore-09447

The `semaphore` member of each element of
`pStripeSemaphoreInfos` **must** have been created with a
[VkSemaphoreType](VkSemaphoreType.html) of [VK_SEMAPHORE_TYPE_BINARY](VkSemaphoreType.html)

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassStripeSubmitInfoARM-sType-sType) VUID-VkRenderPassStripeSubmitInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_STRIPE_SUBMIT_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkRenderPassStripeSubmitInfoARM-pStripeSemaphoreInfos-parameter) VUID-VkRenderPassStripeSubmitInfoARM-pStripeSemaphoreInfos-parameter

 `pStripeSemaphoreInfos` **must** be a valid pointer to an array of `stripeSemaphoreInfoCount` valid [VkSemaphoreSubmitInfo](VkSemaphoreSubmitInfo.html) structures

* 
[](#VUID-VkRenderPassStripeSubmitInfoARM-stripeSemaphoreInfoCount-arraylength) VUID-VkRenderPassStripeSubmitInfoARM-stripeSemaphoreInfoCount-arraylength

 `stripeSemaphoreInfoCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferSubmitInfo](VkCommandBufferSubmitInfo.html)

[VK_ARM_render_pass_striped](VK_ARM_render_pass_striped.html), [VkSemaphoreSubmitInfo](VkSemaphoreSubmitInfo.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkRenderPassStripeSubmitInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
