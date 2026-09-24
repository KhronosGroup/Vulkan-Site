# Debug Drawers: Visualizing Physics and Skeleton

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_glTF/Debugging_Visual_Auditing/02_debug_drawers.html

## Table of Contents

- [The Principle of Debug Visualization](#_the_principle_of_debug_visualization)
- [The_Principle_of_Debug_Visualization](#_the_principle_of_debug_visualization)
- [The Debug Line Buffer](#_the_debug_line_buffer)
- [The_Debug_Line_Buffer](#_the_debug_line_buffer)
- [Creating the Debug Renderer Pipeline](#_creating_the_debug_renderer_pipeline)
- [Creating_the_Debug_Renderer_Pipeline](#_creating_the_debug_renderer_pipeline)
- [Drawing the Skeleton](#_drawing_the_skeleton)
- [Drawing_the_Skeleton](#_drawing_the_skeleton)
- [Drawing Collision Shapes and Constraints](#_drawing_collision_shapes_and_constraints)
- [Drawing_Collision_Shapes_and_Constraints](#_drawing_collision_shapes_and_constraints)

## Content

Before writing any debug drawing code, it is worth understanding the design principle: a debug drawer is not a permanent part of the rendering pipeline. It is a mode-switched overlay that is compiled away in release builds and active in debug or development builds. It should be:

* 
**Simple.** Debug geometry is rendered with a minimal pipeline—no lighting, no textures, no shadows. Solid or wireframe colored lines and shapes.

* 
**Always on top.** Debug geometry is typically rendered with depth testing disabled (or with a very biased depth offset) so it is never hidden by opaque geometry. If a collision capsule is inside a mesh, you still want to see it.

* 
**Zero-overhead when inactive.** In release builds, all debug draw calls should compile to nothing. Use a preprocessor flag or a compile-time constant to eliminate them entirely.

The implementation pattern is a **deferred line buffer**: instead of issuing draw calls immediately for each debug shape, accumulate all the line segments for the frame into a CPU-side buffer, upload the buffer once at the end of the frame, and draw it in a single indexed draw call with a simple unlit shader. This is fast, simple, and GPU-friendly.

struct DebugLine {
    glm::vec3 start;
    glm::vec3 end;
    glm::vec3 color;
};

class DebugDrawer {
public:
    void draw_line(const glm::vec3& start, const glm::vec3& end, const glm::vec3& color)
    {
        lines_.push_back({ start, end, color });
    }

    void draw_sphere(const glm::vec3& center, float radius, const glm::vec3& color,
                     int segments = 16)
    {
        // Draw three orthogonal circles to represent a sphere
        draw_circle(center, radius, glm::vec3(1,0,0), glm::vec3(0,1,0), color, segments);
        draw_circle(center, radius, glm::vec3(1,0,0), glm::vec3(0,0,1), color, segments);
        draw_circle(center, radius, glm::vec3(0,1,0), glm::vec3(0,0,1), color, segments);
    }

    void draw_capsule(const glm::vec3& base, const glm::vec3& tip,
                      float radius, const glm::vec3& color, int segments = 12)
    {
        glm::vec3 axis = tip - base;
        float height   = glm::length(axis);
        if (height  lines_;

    void draw_circle(const glm::vec3& center, float radius,
                     const glm::vec3& x_axis, const glm::vec3& y_axis,
                     const glm::vec3& color, int segments)
    {
        glm::vec3 prev = center + radius * x_axis;
        for (int i = 1; i () * i / segments;
            glm::vec3 curr = center + radius * (std::cos(angle) * x_axis +
                                                std::sin(angle) * y_axis);
            draw_line(prev, curr, color);
            prev = curr;
        }
    }

    static glm::vec3 get_perpendicular(const glm::vec3& v)
    {
        // Find a vector not parallel to v, then cross to get a perpendicular
        glm::vec3 candidate = (std::abs(v.x) () * ring / (segments / 4);
            float phi1 = glm::half_pi() * (ring + 1) / (segments / 4);
            float r0 = radius * std::cos(phi0), h0 = radius * std::sin(phi0);
            float r1 = radius * std::cos(phi1), h1 = radius * std::sin(phi1);
            draw_circle(center + h0 * axis, r0, perp, cross, color, segments);
            for (int j = 0; j () * j / segments;
                glm::vec3 p0 = center + h0*axis + r0*(std::cos(angle)*perp + std::sin(angle)*cross);
                glm::vec3 p1 = center + h1*axis + r1*(std::cos(angle)*perp + std::sin(angle)*cross);
                draw_line(p0, p1, color);
            }
        }
    }

    void upload_to_gpu_and_draw(VkCommandBuffer cmd, VkPipelineLayout layout)
    {
        // 1. Create/Update the Vertex Buffer
        size_t buffer_size = lines_.size() * sizeof(DebugLine);

        // In a real engine, you would use a persistent mapped buffer or a staging pool.
        // For this example, we assume we have a host-visible buffer we can map.
        void* data;
        vmaMapMemory(allocator, debug_buffer_allocation, &data);
        memcpy(data, lines_.data(), buffer_size);
        vmaUnmapMemory(allocator, debug_buffer_allocation);

        // 2. Bind the Debug Pipeline (lines, no depth write, unlit)
        vkCmdBindPipeline(cmd, VK_PIPELINE_BIND_POINT_GRAPHICS, debug_pipeline);

        // 3. Bind the buffer as a vertex buffer
        VkDeviceSize offset = 0;
        vkCmdBindVertexBuffers(cmd, 0, 1, &debug_buffer, &offset);

        // 4. Draw!
        // Each DebugLine contains 2 vertices, so we draw lines_.size() * 2 vertices.
        vkCmdDraw(cmd, static_cast(lines_.size() * 2), 1, 0, 0);
    }
};

Rendering colored lines requires a specialized graphics pipeline. Because we want debug geometry to be visible even through walls, we typically disable depth testing or use a very large depth bias. Here is the complete configuration for a debug line pipeline:

void create_debug_pipeline(VkDevice device, VkRenderPass render_pass, VkPipelineLayout layout, VkPipeline& out_pipeline)
{
    // 1. Shaders: Simple unlit color pass
    // Vertex shader takes vec3 pos, vec3 color and multiplies by ViewProj.
    // Fragment shader simply outputs the color.

    // 2. Primitive Topology: Line List
    VkPipelineInputAssemblyStateCreateInfo inputAssembly{};
    inputAssembly.sType = VK_STRUCTURE_TYPE_PIPELINE_INPUT_ASSEMBLY_STATE_CREATE_INFO;
    inputAssembly.topology = VK_PRIMITIVE_TOPOLOGY_LINE_LIST;

    // 3. Vertex Input Description
    VkVertexInputBindingDescription bindingDescription{};
    bindingDescription.binding = 0;
    bindingDescription.stride = sizeof(DebugLine) / 2; // Stride is per vertex (Pos+Color)
    bindingDescription.inputRate = VK_VERTEX_INPUT_RATE_VERTEX;

    std::vector attributeDescriptions(2);
    attributeDescriptions[0].binding = 0;
    attributeDescriptions[1].binding = 0;
    attributeDescriptions[0].location = 0; // Position
    attributeDescriptions[1].location = 1; // Color
    attributeDescriptions[0].format = VK_FORMAT_R32G32B32_SFLOAT;
    attributeDescriptions[1].format = VK_FORMAT_R32G32B32_SFLOAT;
    attributeDescriptions[0].offset = offsetof(DebugLine, start); // Start and color are interleaved
    attributeDescriptions[1].offset = offsetof(DebugLine, color);

    VkPipelineVertexInputStateCreateInfo vertexInputInfo{};
    vertexInputInfo.sType = VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_STATE_CREATE_INFO;
    vertexInputInfo.vertexBindingDescriptionCount = 1;
    vertexInputInfo.pVertexBindingDescriptions = &bindingDescription;
    vertexInputInfo.vertexAttributeDescriptionCount = static_cast(attributeDescriptions.size());
    vertexInputInfo.pVertexAttributeDescriptions = attributeDescriptions.data();

    // 4. Rasterizer: Line width
    VkPipelineRasterizationStateCreateInfo rasterizer{};
    rasterizer.sType = VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_STATE_CREATE_INFO;
    rasterizer.polygonMode = VK_POLYGON_MODE_LINE;
    rasterizer.lineWidth = 1.0f;
    rasterizer.cullMode = VK_CULL_MODE_NONE;

    // 5. Disable Depth Testing (to see lines through geometry)
    VkPipelineDepthStencilStateCreateInfo depthStencil{};
    depthStencil.sType = VK_STRUCTURE_TYPE_PIPELINE_DEPTH_STENCIL_STATE_CREATE_INFO;
    depthStencil.depthTestEnable = VK_FALSE;
    depthStencil.depthWriteEnable = VK_FALSE;

    // ... Create the pipeline ...
}

The skeleton is the most important debug overlay. It makes the scene graph transform hierarchy visible, showing exactly where each joint is in world space and which joint is which bone’s parent:

const glm::vec3 BONE_COLOR = { 1.0f, 1.0f, 0.0f };  // Yellow for bones
const glm::vec3 JOINT_COLOR = { 1.0f, 0.5f, 0.0f }; // Orange for joint spheres

void draw_skeleton(
    DebugDrawer&              drawer,
    const std::vector&  nodes,
    const Skin&               skin)
{
    for (uint32_t joint_idx = 0; joint_idx 

Drawing collision shapes requires querying the physics engine for the current transform of each body, then using the stored `ColliderDef` to determine the shape parameters:

const glm::vec3 KINEMATIC_COLOR = { 0.0f, 1.0f, 0.0f };  // Green: animation-driven
const glm::vec3 DYNAMIC_COLOR   = { 1.0f, 0.0f, 0.0f };  // Red: physics-driven

void draw_bone_bodies(
    DebugDrawer&                    drawer,
    const std::vector&    bodies,
    const PhysicsWorld&             physics_world,
    RagdollState                    ragdoll_state)
{
    for (const auto& bone_body : bodies) {
        PhysicsPose pose = physics_world.get_body_pose(bone_body.physics_body);

        glm::vec3 color = (ragdoll_state == RagdollState::RAGDOLL)
                        ? DYNAMIC_COLOR
                        : KINEMATIC_COLOR;

        glm::mat4 body_transform = pose.to_matrix();

        const ColliderDef& def = bone_body.collider_def;
        if (def.shape == ColliderDef::Shape::CAPSULE) {
            // Compute capsule base and tip in world space
            // (assumes capsule local axis is Y)
            glm::vec3 local_base = glm::vec3(0, -def.half_height, 0);
            glm::vec3 local_tip  = glm::vec3(0,  def.half_height, 0);
            glm::vec3 world_base = glm::vec3(body_transform * glm::vec4(local_base, 1));
            glm::vec3 world_tip  = glm::vec3(body_transform * glm::vec4(local_tip,  1));
            drawer.draw_capsule(world_base, world_tip, def.radius, color);

        } else if (def.shape == ColliderDef::Shape::BOX) {
            drawer.draw_box(body_transform, def.box_half_extents, color);
        }
    }
}

For physics constraints, the `PhysicsWorld` interface does not expose a generic constraint query API, since constraint introspection is highly engine-specific in Jolt. The code below is **pseudocode** showing the pattern you would implement by casting your constraint handles to the concrete Jolt type (`JPH::Constraint*`) and reading `mPoint1`, `mHingeAxis1`, etc. directly:

// PSEUDOCODE — illustrates the pattern; get_constraint_debug_info() is not part
// of the PhysicsWorld interface. Implement by casting to JPH::SwingTwistConstraint*
// or JPH::HingeConstraint* and reading Jolt-specific members directly.

const glm::vec3 CONSTRAINT_COLOR = { 0.0f, 0.5f, 1.0f }; // Blue for constraints
const glm::vec3 LIMIT_COLOR      = { 1.0f, 0.0f, 1.0f }; // Magenta for limits

void draw_constraints(
    DebugDrawer&              drawer,
    const std::vector& constraint_handles)
{
    for (void* constraint : constraint_handles) {
        // Cast to the concrete Jolt type and extract anchor/axis data
        // (ConstraintDebugInfo is a project-specific helper struct, not part of Jolt)
        ConstraintDebugInfo info = extract_constraint_debug_info(constraint);

        // Draw a line connecting the two constraint anchor points
        drawer.draw_line(info.anchor_a, info.anchor_b, CONSTRAINT_COLOR);

        // For hinge constraints, draw the hinge axis as a small arrow
        if (info.type == ConstraintType::HINGE) {
            glm::vec3 axis_end = info.anchor_a + info.hinge_axis_world * 0.05f;
            drawer.draw_line(info.anchor_a, axis_end, LIMIT_COLOR);
        }

        // For ball-socket constraints, draw a small sphere at the pivot
        if (info.type == ConstraintType::BALL_SOCKET) {
            drawer.draw_sphere(info.anchor_a, 0.01f, LIMIT_COLOR);
        }
    }
}

When the ragdoll handoff from Chapter 4 goes wrong and bodies explode apart, these overlays will immediately show you whether the problem is the constraints failing to hold (the capsules are no longer touching, and the connecting lines are very long) or the bodies being in the wrong initial position (the capsules are offset from the rendered mesh).

[Previous: Introduction](01_introduction.html) | [Next: Skinning Heatmaps](03_skinning_heatmaps.html)
