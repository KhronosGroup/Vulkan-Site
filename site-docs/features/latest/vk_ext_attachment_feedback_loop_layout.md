# VK_EXT_attachment_feedback_loop_layout

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_attachment_feedback_loop_layout.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [4. Issues](#_issues)
- [4.1. Is it possible to use VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT image layout with sparse images?](#_is_it_possible_to_use_vk_image_layout_attachment_feedback_loop_optimal_ext_image_layout_with_sparse_images)
- [4.1._Is_it_possible_to_use_VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT_image_layout_with_sparse_images?](#_is_it_possible_to_use_vk_image_layout_attachment_feedback_loop_optimal_ext_image_layout_with_sparse_images)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)
[4. Issues](#_issues)

[4.1. Is it possible to use `VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT` image layout with sparse images?](#_is_it_possible_to_use_vk_image_layout_attachment_feedback_loop_optimal_ext_image_layout_with_sparse_images)

This document details API design ideas for the `VK_EXT_attachment_feedback_loop_layout` extension,
which provides functionality to both render to and sample/fetch from the same subresource of an image in a given
render pass.

Some applications and API layering efforts need a way to sample from an image that is being rendered to
at the same time. This can either be a color attachment or a depth/stencil attachment.

Some applications and API layering efforts were using
`VK_IMAGE_LAYOUT_GENERAL` for feedback loops against the specification.

The cases that need to be covered are:

* 
One-to-one texel-to-pixel interactions.

* 
Reading/sampling from a region not currently being written
to the image as a color or depth/stencil attachment.

Ideally, the solution would also support sampling an image using regular texture operations.

Extend input attachments + `subpassLoad` to support disjoint regions:

* 
Using input attachments would also require extra work to patch shaders and re-compile pipelines
at draw time, which would result in stutter.

* 
Would not support using samplers, which is needed by the layers.

* 
Would somehow need to support lod-bias/grad which really does not make sense for `subpassLoad`.

Require image copies for feedback loops used in this manner

* 
There can be hundreds of draws with a feedback loop which results in a hundreds of copies and barriers
between each draw call, which does not work for performance.

Add a new `VkImageLayout` that supports attachment feedback loops.

Add a new layout, `VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT`, that supports attachment feedback loops.

It will support all of the following cases:

* 
One-to-one texel-to-pixel interactions.

* 
Reading/sampling from a region not currently being written
to the image as a color or depth/stencil attachment.

* 
Sampling or fetching from the image while it is not a
color or depth/stencil attachment in the current render pass.

* 
Writing to the image as a color or depth/stencil attachment while it is not
being sampled or fetched in the current render pass.

Yes, there is no difference between sparse and non-sparse images.
