# Ray Query Reflections

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/courses/18_Ray_tracing/06_Reflections.html

## Table of Contents

- [Task 11: Implement ray query reflections](#_task_11_implement_ray_query_reflections)
- [Task_11:_Implement_ray_query_reflections](#_task_11_implement_ray_query_reflections)
- [Navigation](#_navigation)

## Content

**Objective**: We will cast a ray in the mirror-reflection direction from the fragment to see what it hits, simulating reflective materials (like a mirror or shiny surface).

Reflections are implemented similarly to shadow rays, but we cast a ray from the shaded point along the mirror direction and sample the hit surface color.

First, we will use push constants to pass the reflective material flag to the fragment shader. This will allow us to determine if the current material is reflective or not.

Let’s pretend that it is been a rainy day, and the table is covered in water, so it reflects the environment.

We need to update the `PushConstant` struct to include a `reflective` flag, both in the renderer:

struct PushConstant {
    uint32_t materialIndex;
    uint32_t reflective;
};

And in the shader:

struct PushConstant {
    uint materialIndex;
    uint reflective;
};
[push_constant]
PushConstant pc;

And update the values that we assign to it before issuing the draw call:

PushConstant pushConstant = {
    .materialIndex = sub.materialID (sub.materialID),
    .reflective = sub.reflective
};
commandBuffers[frameIndex].pushConstants(pipelineLayout, vk::ShaderStageFlagBits::eFragment, 0, pushConstant);

commandBuffers[frameIndex].drawIndexed(sub.indexCount, 1, sub.indexOffset, 0, 0);

We will then retrieve this in the fragment shader, before we apply the shadow effect, to call a helper function that will modify the fragment color in-place, based on the reflection ray query:

   float3 P = vertIn.worldPos;
   float3 N = vertIn.fragNormal;

   if (pc.reflective > 0) {
       apply_reflection(P, N, baseColor);
   }

   bool inShadow = in_shadow(P);

The implementation of the `apply_reflection()` function will be similar to the `in_shadow()` function. The `Proceed()` loops is no longer optional, as we do not only need to check for any intersection, we need the full color of the closest hit triangle to apply the reflection effect.

Note how it requires the normal direction (`N`). This is because reflections are a function of the surface normal and the view direction `V`. The reflection direction `R` is calculated easily with the built-in `reflect()` function:

![38 TASK11 concept reflections](../../_images/images/38_TASK11_concept_reflections.png)

void apply_reflection(float3 P, float3 N, inout float4 baseColor) {
    // Build the reflections ray
    float3 V = normalize(ubo.cameraPos - P);
    float3 R = reflect(-V, N);

We then define the ray description, similar to how we did for shadows:

    RayDesc reflectionRayDesc;
    reflectionRayDesc.Origin = P;
    reflectionRayDesc.Direction = R;
    reflectionRayDesc.TMin = EPSILON;
    reflectionRayDesc.TMax = 1e4;

And initialize the `RayQuery` object. In this case however, we cannot use the `RAY_FLAG_ACCEPT_FIRST_HIT_AND_END_SEARCH` flag, because we need to retrieve the full color of the closest triangle, not just any triangle:

    // Initialize a ray query for reflections
    RayQuery rq;
    let rayFlags = RAY_FLAG_SKIP_PROCEDURAL_PRIMITIVES;

We can now launch our reflection ray:

    rq.TraceRayInline(accelerationStructure, rayFlags, 0xFF, reflectionRayDesc);

The `Proceed()` loop is exactly the same:

    while (rq.Proceed())
    {
        uint instanceID = rq.CandidateRayInstanceCustomIndex();
        uint primIndex = rq.CandidatePrimitiveIndex();

        float2 uv = intersection_uv(instanceID, primIndex, rq.CandidateTriangleBarycentrics());

        uint materialID = instanceLUTBuffer[NonUniformResourceIndex(instanceID)].materialID;
        float4 intersection_color = textures[NonUniformResourceIndex(materialID)].SampleLevel(textureSampler, uv, 0);

        if (intersection_color.a 

The only additional logic we need is to retrieve the color of the hit triangle and apply it to the base color of the fragment. Note how the logic is almost the same as in the loop, but this time we use the `Committed` version of the functions, rather than `Candidate`:

    if (hit)
    {
        uint instanceID = rq.CommittedRayInstanceCustomIndex();
        uint primIndex = rq.CommittedPrimitiveIndex();

        float2 uv = intersection_uv(instanceID, primIndex, rq.CommittedTriangleBarycentrics());

        uint materialID = instanceLUTBuffer[NonUniformResourceIndex(instanceID)].materialID;
        float4 intersectionColor = textures[NonUniformResourceIndex(materialID)].SampleLevel(textureSampler, uv, 0);

        baseColor.rgb = lerp(baseColor.rgb, intersectionColor.rgb, 0.7);
    }

|  | As an exercise, you could extend this function to sample a skybox if the ray misses all the geometry in the scene and there is no committed triangle hit. |
| --- | --- |

Re-build and run using:

#define LAB_TASK_LEVEL 11

With all this in place, you should now see some shiny reflections on the table:

![38 TASK11 alphacut reflections](../../_images/images/38_TASK11_alphacut_reflections.png)

* 
Previous: [Shadow transparency](05_Shadow_transparency.html)

* 
Next: [Conclusion](07_Conclusion.html)
